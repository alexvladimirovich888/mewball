import React, { useState, useEffect } from "react";
import { CONFIG } from "./config";
import { ConnectedWallet } from "./types";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AirdropFeed } from "./components/AirdropFeed";
import { PnLChecker } from "./components/PnLChecker";
import { Footer } from "./components/Footer";
import { playMeowSound } from "./services/meowSound";

export default function App() {
  const [tokenMint, setTokenMint] = useState<string>(CONFIG.TOKEN_MINT || "");
  const [distributorWallet, setDistributorWallet] = useState<string>(CONFIG.DISTRIBUTOR_WALLET || "");
  const [wallet, setWallet] = useState<ConnectedWallet | null>(null);

  // Global click event listener for cat meow sound
  useEffect(() => {
    const handleGlobalClick = () => {
      playMeowSound();
    };

    window.addEventListener("click", handleGlobalClick);
    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  // Fetch initial config from backend server if available
  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data.TOKEN_MINT && !tokenMint) {
          setTokenMint(data.TOKEN_MINT);
        }
        if (data.DISTRIBUTOR_WALLET && !distributorWallet) {
          setDistributorWallet(data.DISTRIBUTOR_WALLET);
        }
      })
      .catch((e) => console.log("Using client fallback config:", e));
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-white text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950 relative flex flex-col p-2 sm:p-4 gap-3">

      <div className="relative z-10 flex flex-col h-full w-full max-w-7xl mx-auto gap-3">
        {/* Header */}
        <Header
          wallet={wallet}
          setWallet={setWallet}
          tokenMint={tokenMint}
        />

        {/* Main Single-Screen Content Grid */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-2 min-h-0 overflow-hidden">
          {/* Left Column: Hero & Live Stats + PnL Checker */}
          <div className="lg:col-span-7 flex flex-col gap-2 min-h-0 overflow-y-auto no-scrollbar">
            <Hero
              tokenMint={tokenMint}
              setTokenMint={setTokenMint}
            />
            <PnLChecker
              connectedWallet={wallet}
            />
          </div>

          {/* Right Column: Real-time Live Ball-Throw Feed */}
          <div className="lg:col-span-5 flex flex-col min-h-0 overflow-hidden">
            <AirdropFeed
              distributorWallet={distributorWallet}
              tokenMint={tokenMint}
              setDistributorWallet={setDistributorWallet}
            />
          </div>
        </main>

        {/* Compact Footer */}
        <Footer tokenMint={tokenMint} />
      </div>
    </div>
  );
}
