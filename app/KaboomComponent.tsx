"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";
import kaboom, { KaboomCtx } from "kaboom";
import { scaleFactor } from "./constants";

const KaboomComponent: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [dialogueText, setDialogueText] = useState("");
    const [dialogueCallback, setDialogueCallback] = useState<(() => void) | null>(null);

    const closeDialogue = () => {
        setIsVisible(false);
        setDialogueText("");
        // Call the callback function if it exists
        if (dialogueCallback) {
            dialogueCallback();
        }
    };

    const displayDialogue = (text: SetStateAction<string>, cb: (() => void) | null) => {
        setIsVisible(true);
        setDialogueText(text);
        setDialogueCallback(() => cb);
    };

    useEffect(() => {
        if (canvasRef.current) {
            const k: KaboomCtx = kaboom({
                touchToMouse: true,
                canvas: canvasRef.current,
                background: [188, 75, 22],
            });

            k.loadSprite('spritesheet', '../spritesheet.png', {
                sliceX: 39,
                sliceY: 31,
                anims: {
                    "idle-down": 936,
                    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
                },
            });
            k.loadSprite('map', "../map.png");

            k.scene("main", async () => {
                const mapData = await (await fetch("../map.json")).json();
                const layers = mapData.layers;
                const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

                const player = k.add([
                    k.sprite("spritesheet", { anim: "idle-down" }),
                    k.area({
                        shape: new k.Rect(k.vec2(0, 3), 10, 10),
                    }),
                    k.body(),
                    k.anchor("center"),
                    k.pos(1000, 200),
                    k.scale(scaleFactor),
                    {
                        speed: 250,
                        direction: "up",
                        isInDialogue: false,
                    },
                    "player",
                ]);

                for (const layer of layers) {
                    if (layer.name === "boundaries") {
                        for (const boundary of layer.objects) {
                            map.add([
                                k.area({
                                    shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
                                }),
                                k.body({ isStatic: true }),
                                k.pos(boundary.x, boundary.y),
                                boundary.name,
                            ]);

                            if (boundary.name === "wall") {
                                player.onCollide(boundary.name, () => {
                                    if (!player.isInDialogue) {
                                        player.isInDialogue = true;
                                        displayDialogue('take it', () => {
                                            player.isInDialogue = false;
                                        });
                                    }
                                });
                            }
                        }
                    }
                }

                k.onUpdate(() => {

                    k.camPos(player.pos.x, player.pos.y + 100);
                });

                k.onMouseDown((mouseBtn) => {
                    if (mouseBtn !== "left" || player.isInDialogue) return;

                    const worldMousePos = k.toWorld(k.mousePos());
                    player.moveTo(worldMousePos, player.speed);
                });
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
                        bottom: "20px", // Position it at the bottom of the container
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "white",
                        padding: "10px",
                        borderRadius: "10px",
                        zIndex: 1000,
                        fontFamily: "monogram",
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
