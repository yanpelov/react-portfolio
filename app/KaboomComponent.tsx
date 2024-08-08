"use client";

import { useEffect, useRef, useState } from "react";
import kaboom, { KaboomCtx } from "kaboom";
import { playerSpeed, scaleFactor } from "./constants";

const KaboomComponent: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [dialogueText, setDialogueText] = useState("");
    const [dialogueCallback, setDialogueCallback] = useState<(() => void) | null>(null);

    const closeDialogue = () => {
        setIsVisible(false);
        setDialogueText("");
        dialogueCallback?.();
    };

    const displayDialogue = (text: string, cb: (() => void) | null) => {

        let i = 0;
        let showed = ""
        const typeChars = () => {
            if (i < text.length) {
                showed += text[i++];
                setDialogueText(showed);
                setTimeout(typeChars, 10)
            }
        }

        typeChars()
        setIsVisible(true);

        setDialogueCallback(() => cb);

    }



    useEffect(() => {
        if (canvasRef.current) {
            const k: KaboomCtx = kaboom({
                touchToMouse: true,
                canvas: canvasRef.current,
                background: [0, 0, 0]
            });

            k.loadFont("monogram", "/monogram.ttf");  // Load monogram font
            k.loadSprite('spritesheet', '../spritesheet.png', {
                sliceX: 39,
                sliceY: 31,
                anims: {
                    "idle-down": 936,
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
                                if (prop.name === "fence") {

                                    player.onCollide(prop.name, () => {

                                        if (!player.isInDialogue) {
                                            player.isInDialogue = true;
                                            displayDialogue('dont jump over ', () => {
                                                player.isInDialogue = false;
                                                player.onKeyDown((key) => {
                                                    switch (key) {
                                                        case "down":
                                                            player.move(0, player.speed);
                                                            break;
                                                    }
                                                })

                                            });
                                        }
                                    });
                                }

                                if (prop.name === "potion") {
                                    player.onCollide(prop.name, () => {
                                        if (!player.isInDialogue) {
                                            player.isInDialogue = true;
                                            displayDialogue('you like it? ', () => {
                                                player.isInDialogue = false;
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });

                    k.onUpdate(() => {
                        k.camPos(player.pos.x, player.pos.y + 100);
                    });

                    k.onKeyDown((key) => {
                        if (player.isInDialogue) return;
                        switch (key) {
                            case "left":

                                player.move(-player.speed, 0);
                                player.direction = "walk-left";

                                break;
                            case "right":
                                player.move(player.speed, 0);
                                player.direction = "walk-right";

                                break;
                            case "up":
                                player.move(0, -player.speed);
                                player.direction = "walk-up";

                                break;
                            case "down":
                                player.move(0, player.speed);
                                player.direction = "walk-down";

                                break;
                        }

                        if (player.curAnim() !== player.direction) {
                            player.play(player.direction);
                        }
                    });

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
                <div
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "white",
                        padding: "10px",
                        borderRadius: "10px",
                        zIndex: 1000,
                        fontFamily: "monogram",
                        fontSize: "30px"
                    }}
                >
                    {dialogueText}
                    <button onClick={closeDialogue}>close</button>
                </div>
            )}
        </>
    );
};

export default KaboomComponent;
