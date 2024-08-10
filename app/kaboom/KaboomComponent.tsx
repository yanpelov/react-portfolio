"use client";

import { useEffect, useRef, useState } from "react";
import kaboom, { AnchorComp, AreaComp, BodyComp, GameObj, KaboomCtx, PosComp, ScaleComp, SpriteComp } from "kaboom";
import { playerSpeed, scaleFactor, TextWithPhoto, content } from "../constants";
import { useRouter } from "next/navigation";

const KaboomComponent: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [dialogueText, setDialogueText] = useState("");
    const [dialogueImg, setDialogueImg] = useState("");
    const [dialogueCallback, setDialogueCallback] = useState<(() => void) | null>(null);
    const router = useRouter();

    type ContentKeys = keyof typeof content;
    type Direction = "left" | "right" | "up" | "down";

    const isValidKey = (key: any): key is ContentKeys => {
        return key in content;
    };

    const getContent = (key: string): TextWithPhoto => content[key] || {};

    const closeDialogue = () => {
        setIsVisible(false);
        setDialogueText("");
        setDialogueImg("");
        dialogueCallback?.();
    };

    const displayDialogue = (text: string, cb: (() => void) | null) => {
        let i = 0;
        let showed = "";
        const typeChars = () => {
            if (i < text.length) {
                showed += text[i++];
                setDialogueText(showed);
                setTimeout(typeChars, 6);
            }
        };

        typeChars();
        setIsVisible(true);
        setDialogueCallback(() => cb);
    };

    const propAction = (player: GameObj<SpriteComp | PosComp | ScaleComp | AreaComp | BodyComp | AnchorComp | { speed: number; direction: string; isInDialogue: boolean; }>, propName: string) => {
        player.onCollide(propName, () => {
            if (!player.isInDialogue) {
                player.isInDialogue = true;
                if (propName === "cv") {
                    setTimeout(() => {
                        router.push('/cv');
                    }, 5000);
                }

                const { text = '', photoUrl = '' }: TextWithPhoto = content[propName] || {};
                setDialogueImg(photoUrl);
                displayDialogue(text, () => {
                    player.isInDialogue = false;
                });
            }
        });
    };

    useEffect(() => {
        if (canvasRef.current) {
            const k: KaboomCtx = kaboom({
                touchToMouse: true,
                canvas: canvasRef.current,
                background: [0, 0, 0],
            });

            k.loadFont("monogram", "/monogram.ttf");  // Load monogram font
            k.loadSprite('spritesheet', '/spritesheet.png', {
                sliceX: 39,
                sliceY: 31,
                anims: {
                    "idle-down": 936,
                    "idle-up": 1014,
                    "idle-left": 1053,
                    "idle-right": 975,
                    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
                    "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
                    "walk-left": { from: 1053, to: 1056, loop: true, speed: 8 },
                    "walk-right": { from: 975, to: 978, loop: true, speed: 8 },
                },
            });
            k.loadSprite('map', "../map.png");

            k.scene("main", async () => {
                try {
                    const mapData = await (await fetch("../map.json")).json();
                    const layers = mapData.layers;

                    const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);
                    k.onLoad(() => {
                        // Calculate the center of the map
                        const mapCenterX = map.width * scaleFactor / 2;
                        const mapCenterY = map.height * scaleFactor / 2;

                        const player = k.add([
                            k.sprite("spritesheet", { anim: "idle-down" }),
                            k.area({
                                shape: new k.Rect(k.vec2(0, 3), 10, 10),
                            }),
                            k.body(),
                            k.anchor("center"),
                            k.pos(mapCenterX, mapCenterY),  // Position player at the map's center
                            k.scale(scaleFactor),
                            {
                                speed: playerSpeed,
                                direction: "walk-down",
                                isInDialogue: false,
                            },
                            "player",
                        ]);

                        layers.forEach((layer: { name: string; objects: any[]; }) => {
                            if (layer.name === "walls") {
                                layer.objects.forEach(boundary => {
                                    map.add([
                                        k.area({
                                            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
                                        }),
                                        k.body({ isStatic: true }),
                                        k.pos(boundary.x, boundary.y),
                                        boundary.name,
                                    ]);
                                });
                            }

                            if (layer.name === "props") {
                                layer.objects.forEach(prop => {
                                    map.add([
                                        k.area({
                                            shape: new k.Rect(k.vec2(0), prop.width, prop.height),
                                        }),
                                        k.body({ isStatic: true }),
                                        k.pos(prop.x, prop.y),
                                        prop.name,
                                    ]);
                                });
                            }

                            if (layer.name === "props") {
                                layer.objects.forEach(prop => {
                                    propAction(player, prop.name);
                                });
                            }
                        });

                        k.onUpdate(() => {
                            k.camPos(player.pos.x, player.pos.y + 100);
                        });


                        const dirs: Record<Direction, any> = {
                            "left": k.LEFT,
                            "right": k.RIGHT,
                            "up": k.UP,
                            "down": k.DOWN,
                        };

                        for (const dir of Object.keys(dirs) as Direction[]) {

                            k.onKeyRelease(dir, () => {
                                player.play(`idle-${dir}`);
                            })

                            k.onKeyPress(dir, () => {
                                closeDialogue();

                                player.isInDialogue = false;
                            })
                            k.onKeyDown(dir, () => {
                                player.move(dirs[dir].scale(player.speed))
                                player.direction = `walk-${dir}`
                                if (player.curAnim() !== player.direction) {
                                    player.play(player.direction);
                                }
                            })
                        }

                        k.onMouseDown((mouseBtn) => {
                            if (mouseBtn !== "left" || player.isInDialogue) return;

                            const worldMousePos = k.toWorld(k.mousePos());
                            const diff = worldMousePos.sub(player.pos);

                            if (Math.abs(diff.x) > Math.abs(diff.y)) {
                                player.direction = diff.x > 0 ? "walk-right" : "walk-left";
                            } else {
                                player.direction = diff.y > 0 ? "walk-down" : "walk-up";
                            }

                            if (player.curAnim() !== player.direction) {
                                player.play(player.direction);
                            }
                            player.moveTo(worldMousePos, player.speed);
                        });


                        k.onMouseRelease(() => {
                            switch (player.curAnim()) {
                                case "walk-down":
                                    player.play("idle-down");
                                    break;
                                case "walk-up":
                                    player.play("idle-up");
                                    break;
                                case "walk-left":
                                    player.play("idle-left");
                                    break;
                                case "walk-right":
                                    player.play("idle-right");
                                    break;
                            }
                        });

                        const { text = '', photoUrl = '' }: TextWithPhoto = content.intro || {};

                        displayDialogue(text, () => {
                            player.isInDialogue = false;
                        });


                    })
                } catch (error) {
                    console.error("Failed to load map data:", error);
                }
            });

            k.go("main");
        }
    }, []);

    return (
        <>
            <canvas ref={canvasRef} />
            {isVisible && (
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 text-black p-4 rounded-lg z-50 font-[monogram] text-2xl flex flex-col w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%]">
                    {dialogueImg.length > 0 ? (
                        <img
                            className="p-2.5 mx-auto w-full h-auto max-w-sm lg:max-w-[200px]"
                            src={dialogueImg}
                            alt="Dialogue"
                        />
                    ) : null}
                    <div>
                        <span dangerouslySetInnerHTML={{ __html: dialogueText }} />
                    </div>
                    <button
                        className="font-[monogram] text-black bg-white mt-2 bg-opacity-80 border-dashed border-2 border-black px-4 py-2 uppercase tracking-wider hover:bg-gray-800 hover:border-green-500 hover:text-green-500 opacity-80 hover:opacity-100"
                        onClick={closeDialogue}
                    >
                        Close
                    </button>
                </div>


            )}
        </>
    );
};

export default KaboomComponent;
