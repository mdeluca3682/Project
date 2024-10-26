"use client";
import { useState, useRef } from "react";

interface Droplet {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

interface HoneyButtonProps {
  onClick: (increment: number) => void;
  multiplier: number;
}

export default function HoneyButton({ onClick, multiplier }: HoneyButtonProps) {
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const isAnimating = useRef(false);

  const honeyClicked = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    onClick(multiplier);

    createDroplets();
    createSparkles();

    setTimeout(() => {
      isAnimating.current = false;
    }, 100);
  };

  const createDroplets = () => {
    const newDroplets: Droplet[] = Array.from({ length: 3 }).map(() => ({
      id: Math.random(),
      startX: Math.random() * 200 - 100,
      startY: Math.random() * 20 + 70,
      endX: Math.random() * 300 - 150,
      endY: Math.random() * 300 + 150,
    }));

    setDroplets((prev) => [...prev, ...newDroplets]);

    setTimeout(() => {
      setDroplets((prev) =>
        prev.filter((droplet) => !newDroplets.includes(droplet))
      );
    }, 1000);
  };

  const createSparkles = () => {
    const newSparkles: Sparkle[] = Array.from({ length: 2 }).map(() => ({
      id: Math.random(),
      x: Math.random() * 300 - 150,
      y: Math.random() * 300 - 150,
    }));

    setSparkles((prev) => [...prev, ...newSparkles]);

    setTimeout(() => {
      setSparkles((prev) =>
        prev.filter((sparkle) => !newSparkles.includes(sparkle))
      );
    }, 800);
  };

  return (
    <div className="honey-button-container">
      <div className="honey-circle"></div>
      <div className="clickable-area" onClick={honeyClicked}>
        <img
          src="/honey-image.png"
          alt="Honey the cat"
          style={{ cursor: "pointer" }}
        />
      </div>
      {droplets.map((droplet) => (
        <div
          key={droplet.id}
          className="honey-droplet"
          style={
            {
              left: `calc(50% + ${droplet.startX}px)`,
              top: `calc(50% + ${droplet.startY}px)`,
              "--end-x": `${droplet.endX}px`,
              "--end-y": `${droplet.endY}px`,
            } as React.CSSProperties
          }
        />
      ))}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="honey-sparkle"
          style={
            {
              left: `calc(50% + ${sparkle.x}px)`,
              top: `calc(50% + ${sparkle.y}px)`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
