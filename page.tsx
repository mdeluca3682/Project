"use client";
import HoneyButton from "./honey-button";
import "./globals.css";
import { useEffect, useState, startTransition } from "react";
import Stats from "./Stats";

interface Achievement {
  id: number;
  name: string;
  description: string;
  unlocked: boolean;
}

export default function Home() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [totalHoneyPerClick, setTotalHoneyPerClick] = useState(1);
  const [totalHoneyPerSecond, setTotalHoneyPerSecond] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const [totalHoneyCollected, setTotalHoneyCollected] = useState(0);
  const [totalUpgradesBought, setTotalUpgradesBought] = useState(0);
  const [totalAutoClickersBought, setTotalAutoClickersBought] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalHoneySpentOnUpgrades, setTotalHoneySpentOnUpgrades] = useState(0);
  const [totalHoneySpentOnAutoClickers, setTotalHoneySpentOnAutoClickers] =
    useState(0);
  const [honeyFromAutoClickers, setHoneyFromAutoClickers] = useState(0);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      name: "Honey Farmer",
      description: "Buy your first Treat Farm",
      unlocked: false,
    },
    {
      id: 2,
      name: "Auto Cat",
      description: "Buy your first Auto Clicker",
      unlocked: false,
    },
    {
      id: 3,
      name: "Catnip Collector",
      description: "Buy your first Catnip Garden",
      unlocked: false,
    },
    {
      id: 4,
      name: "Fish Fanatic",
      description: "Buy your first Fish Pond Feast",
      unlocked: false,
    },
    {
      id: 5,
      name: "Sunbeam Seeker",
      description: "Buy your first Sunbeam Stream",
      unlocked: false,
    },
    {
      id: 6,
      name: "Dream Builder",
      description: "Buy your first Dream House",
      unlocked: false,
    },
    {
      id: 7,
      name: "Momentum Maker",
      description: "Buy your first Meow-mentum",
      unlocked: false,
    },
    {
      id: 8,
      name: "Fortune Finder",
      description: "Buy your first Feline Fortune",
      unlocked: false,
    },
    {
      id: 9,
      name: "Whisker Wealth",
      description: "Buy your first Whisker Wealth",
      unlocked: false,
    },
    {
      id: 10,
      name: "Catnip Conqueror",
      description: "Buy your first Catnip Harvest",
      unlocked: false,
    },
    {
      id: 11,
      name: "Click Beginner",
      description: "Reach 100 clicks",
      unlocked: false,
    },
    {
      id: 12,
      name: "Click Novice",
      description: "Reach 500 clicks",
      unlocked: false,
    },
    {
      id: 13,
      name: "Click Master",
      description: "Reach 1,000 clicks",
      unlocked: false,
    },
    {
      id: 14,
      name: "Click Guru",
      description: "Reach 5,000 clicks",
      unlocked: false,
    },
    {
      id: 15,
      name: "Click Legend",
      description: "Reach 10,000 clicks",
      unlocked: false,
    },
    {
      id: 16,
      name: "Honey Collector",
      description: "Collect 100 honey from auto clickers",
      unlocked: false,
    },
    {
      id: 17,
      name: "Sweet Stash",
      description: "Collect 500 honey from auto clickers",
      unlocked: false,
    },
    {
      id: 18,
      name: "Buzzing Bank",
      description: "Collect 1,000 honey from auto clickers",
      unlocked: false,
    },
    {
      id: 19,
      name: "Sticky Empire",
      description: "Collect 5,000 honey from auto clickers",
      unlocked: false,
    },
    {
      id: 20,
      name: "Golden Hive",
      description: "Collect 10,000 honey from auto clickers",
      unlocked: false,
    },
  ]);

  const [showAchievement, setShowAchievement] = useState<Achievement | null>(
    null
  );

  const [upgradeButtons, setUpgradeButtons] = useState([
    { id: 1, cost: 20, name: "Treat Farm", multiplier: 2, locked: true },
    { id: 2, cost: 100, name: "Catnip Garden", multiplier: 2.5, locked: true },
    { id: 3, cost: 300, name: "Fish Pond Feast", multiplier: 3, locked: true },
    { id: 4, cost: 800, name: "Sunbeam Stream", multiplier: 3.5, locked: true },
    { id: 5, cost: 1500, name: "Dream House", multiplier: 4, locked: true },
  ]);

  const [autoClickerButtons, setAutoClickerButtons] = useState([
    {
      id: 1,
      cost: 100,
      honeyPerSecond: 1,
      name: "Paw-sitive Vibes",
      locked: true,
    },
    { id: 2, cost: 250, honeyPerSecond: 2, name: "Meow-mentum", locked: true },
    {
      id: 3,
      cost: 500,
      honeyPerSecond: 3,
      name: "Feline Fortune",
      locked: true,
    },
    {
      id: 4,
      cost: 1000,
      honeyPerSecond: 4,
      name: "Whisker Wealth",
      locked: true,
    },
    {
      id: 5,
      cost: 2000,
      honeyPerSecond: 5,
      name: "Catnip Harvest",
      locked: true,
    },
  ]);

  const [upgradeCounts, setUpgradeCounts] = useState(
    Array(upgradeButtons.length).fill(0)
  );
  const [autoClickerCounts, setAutoClickerCounts] = useState(
    Array(autoClickerButtons.length).fill(0)
  );

  const handleClick = () => {
    const increment = totalHoneyPerClick;

    startTransition(() => {
      setCount((prevCount) => prevCount + increment);
      setTotalHoneyCollected((prevTotal) => prevTotal + increment);
      setTotalClicks((prevClicks) => {
        const newTotalClicks = prevClicks + 1;

        if (newTotalClicks === 100) unlockAchievement(11);
        else if (newTotalClicks === 500) unlockAchievement(12);
        else if (newTotalClicks === 1000) unlockAchievement(13);
        else if (newTotalClicks === 5000) unlockAchievement(14);
        else if (newTotalClicks === 10000) unlockAchievement(15);

        return newTotalClicks;
      });
    });
  };

  const honeyPerClickValues = [1, 2, 3, 4, 5];

  const purchaseUpgrade = (index: number) => {
    const selectedUpgrade = upgradeButtons[index];

    const newHoneyCount = count - selectedUpgrade.cost;

    if (newHoneyCount >= 0) {
      setCount(newHoneyCount);
      setTotalUpgradesBought((prevTotal) => prevTotal + 1);
      setTotalHoneySpentOnUpgrades((prev) => prev + selectedUpgrade.cost);
      setTotalHoneyPerClick((prevTotal) => {
        const newTotal = prevTotal + honeyPerClickValues[index];
        return newTotal;
      });

      setUpgradeCounts((prevCounts) => {
        const newCounts = [...prevCounts];
        newCounts[index] += 1;
        return newCounts;
      });

      const updatedButtons = [...upgradeButtons];
      updatedButtons[index].cost = Math.floor(
        selectedUpgrade.cost * selectedUpgrade.multiplier
      );
      setUpgradeButtons(updatedButtons);

      if (index === 0 && !achievements[0].unlocked) unlockAchievement(1); // Treat Farm
      if (index === 1 && !achievements[2].unlocked) unlockAchievement(3); // Catnip Garden
      if (index === 2 && !achievements[3].unlocked) unlockAchievement(4); // Fish Pond Feast
      if (index === 3 && !achievements[4].unlocked) unlockAchievement(5); // Sunbeam Stream
      if (index === 4 && !achievements[5].unlocked) unlockAchievement(6); // Dream House
    }
  };

  const unlockAchievement = (id: number) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement) =>
        achievement.id === id ? { ...achievement, unlocked: true } : achievement
      )
    );
    const achievement = achievements.find((ach) => ach.id === id);
    if (achievement) setShowAchievement(achievement);
  };

  const purchaseAutoClicker = (index: number) => {
    const autoClicker = autoClickerButtons[index];
    if (count >= autoClicker.cost) {
      setIsPurchasing(true);
      setCount((prevCount) => prevCount - autoClicker.cost);
      setTotalAutoClickersBought((prevTotal) => prevTotal + 1);
      setTotalHoneySpentOnAutoClickers((prev) => prev + autoClicker.cost);
      setAutoClickers((prevAutoClickers) => {
        const newTotal = prevAutoClickers + autoClicker.honeyPerSecond;
        setTotalHoneyPerSecond(newTotal);
        return newTotal;
      });

      setAutoClickerCounts((prevCounts) => {
        const newCounts = [...prevCounts];
        newCounts[index] += 1;
        return newCounts;
      });

      setAutoClickerButtons((prevButtons) =>
        prevButtons.map((button, i) =>
          i === index
            ? { ...button, cost: Math.floor(button.cost * 1.5) }
            : button
        )
      );

      setIsPurchasing(false);

      if (index === 0 && !achievements[1].unlocked) unlockAchievement(2); // Paw-sitive Vibes
      if (index === 1 && !achievements[7].unlocked) unlockAchievement(8); // Meow-mentum
      if (index === 2 && !achievements[8].unlocked) unlockAchievement(9); // Feline Fortune
      if (index === 3 && !achievements[9].unlocked) unlockAchievement(10); // Whisker Wealth
      if (index === 4 && !achievements[6].unlocked) unlockAchievement(7); // Catnip Harvest
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const increment = autoClickers * 0.1;

      setCount((prevCount) => prevCount + increment);
      setTotalHoneyCollected((prevTotal) => prevTotal + increment);
      setHoneyFromAutoClickers((prev) => {
        const newAutoClickerHoney = prev + increment;

        // Check milestones for honey collected from auto clickers
        if (newAutoClickerHoney >= 100 && !achievements[15].unlocked)
          unlockAchievement(16);
        if (newAutoClickerHoney >= 500 && !achievements[16].unlocked)
          unlockAchievement(17);
        if (newAutoClickerHoney >= 1000 && !achievements[17].unlocked)
          unlockAchievement(18);
        if (newAutoClickerHoney >= 5000 && !achievements[18].unlocked)
          unlockAchievement(19);
        if (newAutoClickerHoney >= 10000 && !achievements[19].unlocked)
          unlockAchievement(20);

        return newAutoClickerHoney;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [autoClickers, achievements]);

  useEffect(() => {
    setUpgradeButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.locked && count >= button.cost - 10
          ? { ...button, locked: false }
          : button
      )
    );

    setAutoClickerButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.locked && count >= button.cost - 10
          ? { ...button, locked: false }
          : button
      )
    );
  }, [count]);

  useEffect(() => {
    if (showAchievement) {
      const timer = setTimeout(() => {
        setShowAchievement(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showAchievement]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container">
      <div className="image-container">
        <HoneyButton onClick={handleClick} multiplier={multiplier} />
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div
          className={`sidebar-text-left ${isSidebarOpen ? "hidden" : ""}`}
          id="shopText"
          style={{
            position: "absolute",
            top: "28%",
            right: "0",
            transform: "translateY(-50%)",
            writingMode: "vertical-rl",
            textOrientation: "upright",
            color: "white",
            fontSize: "28px",
            letterSpacing: "4px",
            fontWeight: "bold",
            zIndex: "15",
            whiteSpace: "nowrap",
            opacity: isSidebarOpen ? 0 : 1,
            transition: "opacity 0.5s ease, visibility 0.5s ease",
            visibility: isSidebarOpen ? "hidden" : "visible",
            background: "#460337",
          }}
        >
          SHOP
        </div>
        <button onClick={toggleSidebar} className="toggle-button">
          {isSidebarOpen ? "←" : "→"}
        </button>
        {isSidebarOpen && (
          <div className="text-container">
            <div className="section upgrade-section">
              <h2 className="upgrade-header">Upgrade Clicker</h2>
              {upgradeButtons.map((button, index) => (
                <div key={button.id} className="button-container">
                  <button
                    className={`shop-button ${button.locked ? "locked" : ""}`}
                    onClick={() => purchaseUpgrade(index)}
                    disabled={
                      button.locked || count < button.cost || isPurchasing
                    }
                  >
                    {button.locked ? (
                      <span className="question-mark">???</span>
                    ) : (
                      <>
                        <span className="label">{button.name}</span>
                        <span className="cost">{button.cost} honey</span>
                      </>
                    )}
                  </button>
                  <p className="counter">Purchased: {upgradeCounts[index]}</p>
                </div>
              ))}
            </div>

            <div className="section autoclicker-section">
              <h2 className="autoclicker-header">Auto Clickers</h2>
              {autoClickerButtons.map((autoClicker, index) => (
                <div key={autoClicker.id} className="button-container">
                  <button
                    className={`autoclicker-button ${
                      autoClicker.locked ? "locked" : ""
                    }`}
                    onClick={() => purchaseAutoClicker(index)}
                    disabled={
                      autoClicker.locked ||
                      count < autoClicker.cost ||
                      isPurchasing
                    }
                  >
                    {autoClicker.locked ? (
                      <span className="question-mark">???</span>
                    ) : (
                      <>
                        <span className="label">{autoClicker.name}</span>
                        <span className="cost">{autoClicker.cost} honey</span>
                      </>
                    )}
                  </button>
                  <p className="counter">
                    Purchased: {autoClickerCounts[index]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="honeyDisplay">
        <p>
          <span className="honey-label">Amount of Honey:</span>{" "}
          <span className="honey-amount">{Math.floor(count)}</span>
        </p>
      </div>
      <Stats
        totalHoney={totalHoneyCollected}
        totalClicks={totalClicks}
        totalHoneyPerClick={totalHoneyPerClick}
        totalHoneyPerSecond={totalHoneyPerSecond}
        totalUpgrades={totalUpgradesBought}
        totalHoneySpentOnUpgrades={totalHoneySpentOnUpgrades}
        totalAutoClickers={totalAutoClickersBought}
        totalHoneySpentOnAutoClickers={totalHoneySpentOnAutoClickers}
        honeyFromAutoClickers={honeyFromAutoClickers}
        achievements={achievements}
      />
      {showAchievement && (
        <div className="achievement-pop-up">
          <span>{showAchievement.name} Unlocked!</span>
          <button
            className="close-btn"
            onClick={() => setShowAchievement(null)}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
