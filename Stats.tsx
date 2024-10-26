import React, { useState, useRef, useEffect } from "react";

interface StatsProps {
  totalHoney: number;
  totalClicks: number;
  totalHoneyPerClick: number;
  totalHoneyPerSecond: number;
  totalUpgrades: number;
  totalHoneySpentOnUpgrades: number;
  totalAutoClickers: number;
  totalHoneySpentOnAutoClickers: number;
  honeyFromAutoClickers: number;
  achievements: {
    id: number;
    name: string;
    description: string;
    unlocked: boolean;
  }[];
}

export default function Stats({
  totalHoney,
  totalClicks,
  totalHoneyPerClick,
  totalHoneyPerSecond,
  totalUpgrades,
  totalHoneySpentOnUpgrades,
  totalAutoClickers,
  totalHoneySpentOnAutoClickers,
  honeyFromAutoClickers,
  achievements,
}: StatsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Handle tooltip appearance and positioning
  const handleTooltipEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    description: string
  ) => {
    const tooltip = tooltipRef.current;
    if (tooltip) {
      tooltip.style.display = "block";
      tooltip.textContent = description;

      const targetRect = (e.target as HTMLElement).getBoundingClientRect();
      const tooltipWidth = tooltip.offsetWidth;

      // Calculate the position
      let tooltipLeft =
        targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
      if (tooltipLeft < 0) tooltipLeft = 0;
      if (tooltipLeft + tooltipWidth > window.innerWidth) {
        tooltipLeft = window.innerWidth - tooltipWidth;
      }

      tooltip.style.left = `${tooltipLeft}px`;
      tooltip.style.top = `${targetRect.bottom + 10}px`; // Offset below the square
    }
  };

  const handleTooltipLeave = () => {
    const tooltip = tooltipRef.current;
    if (tooltip) {
      tooltip.style.display = "none";
    }
  };

  return (
    <div className={`stats-sidebar ${isOpen ? "open" : ""}`}>
      <div className={`sidebar-text-right ${isOpen ? "hidden" : ""}`}>
        STATS
      </div>
      <button className="stats-toggle-button" onClick={toggleSidebar}>
        {isOpen ? "→" : "←"}
      </button>
      {isOpen && (
        <div className="stats-content">
          <h2 className="stats-header">Stats</h2>
          <ul className="stats-list">
            <li>
              <span className="label">Total Honey Collected:</span>
              <span className="value">{Math.floor(totalHoney)}</span>
            </li>
            <li>
              <span className="label">Times Clicked:</span>
              <span className="value">{totalClicks}</span>
            </li>
            <li>
              <span className="label">Honey from Auto:</span>
              <span className="value">{Math.floor(honeyFromAutoClickers)}</span>
            </li>
            <li>
              <span className="label">Honey per Click:</span>
              <span className="value">{totalHoneyPerClick}</span>
            </li>
            <li>
              <span className="label">Honey per Second:</span>
              <span className="value">{totalHoneyPerSecond}</span>
            </li>
            <li>
              <span className="label">Total Upgrades Bought:</span>
              <span className="value">{totalUpgrades}</span>
            </li>
            <li>
              <span className="label">Honey Spent on Upgrades:</span>
              <span className="value">{totalHoneySpentOnUpgrades}</span>
            </li>
            <li>
              <span className="label">Total Autoclickers Bought:</span>
              <span className="value">{totalAutoClickers}</span>
            </li>
            <li>
              <span className="label">Honey Spent on Auto Clickers:</span>
              <span className="value">{totalHoneySpentOnAutoClickers}</span>
            </li>
          </ul>
          <h2 className="achievements-title">Achievements</h2>
          <div className="achievements-container">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-icon">
                <div
                  className={`achievement-square ${
                    achievement.unlocked ? "unlocked" : "locked"
                  }`}
                  onMouseEnter={(e) => {
                    if (achievement.unlocked)
                      handleTooltipEnter(e, achievement.description);
                  }}
                  onMouseLeave={handleTooltipLeave}
                >
                  {!achievement.unlocked && (
                    <span className="question-mark">?</span>
                  )}
                </div>
              </div>
            ))}
            <div className="tooltip" ref={tooltipRef}></div>
          </div>
        </div>
      )}
    </div>
  );
}
