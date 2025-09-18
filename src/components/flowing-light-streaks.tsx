"use client"
import React, { useMemo } from "react";

export default function FlowingLightStreaks() {
  // Generate streaks once, not on every render
  const streaks = useMemo(
    () =>
      [...Array(80)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        height: `${300 + Math.random() * 500}px`,
        color: ["#06b6d4", "#8b5cf6", "#f59e0b", "#ec4899", "#10b981"][
          Math.floor(Math.random() * 5)
        ],
        duration: `${1 + Math.random() * 2}s`, // faster fade
     
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {streaks.map((s) => (
        <div
          key={`streak-${s.id}`}
          className="absolute"
          style={{
            left: s.left,
            top: s.top,
            width: "2px",
            height: s.height,
            background: `linear-gradient(180deg, transparent, ${s.color}, transparent)`,
            animation: `fadeStreak ${s.duration} ease-in-out infinite`,
           
          }}
        />
      ))}

      <style jsx>{`
        @keyframes fadeStreak {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
