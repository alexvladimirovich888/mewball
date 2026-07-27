import React, { useState } from "react";
import { Flame, RefreshCw, ShieldCheck, PieChart, Coins, TrendingUp, Cpu, Zap, ArrowRight } from "lucide-react";

export const TokenomicsBuyback: React.FC = () => {
  const [dailyVolumeUsd, setDailyVolumeUsd] = useState<number>(150000);
  const [feePercentage, setFeePercentage] = useState<number>(1.0); // 1.0% pump.fun / DEX fee allocated to buyback

  const solPriceUsd = 180;
  const calculatedDailyFeeUsd = (dailyVolumeUsd * feePercentage) / 100;
  const calculatedDailyFeeSol = calculatedDailyFeeUsd / solPriceUsd;
  const monthlyBuybackUsd = calculatedDailyFeeUsd * 30;

  return (
    <section id="tokenomics" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-4 h-4" />
            <span>Automated On-Chain Economics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tokenomics & Buyback Mechanics
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            $CATBALL is engineered with continuous buyback pressure. 100% of pump.fun and Raydium trading fees are fed back into automated chart Buybacks to continuously absorb supply.
          </p>
        </div>

        {/* Tokenomics Distribution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-slate-950/40 backdrop-blur-md border border-slate-800/80 hover:border-amber-500/40 rounded-3xl p-6 transition shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-orange-500/10 rounded-bl-full pointer-events-none group-hover:bg-orange-500/20 transition"></div>
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-amber-400 mb-4 font-black text-xl">
              60%
            </div>
            <h3 className="text-xl font-bold text-white">Rekt Trader Ball-Throw Pool</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              600,000,000 $CATBALL (60% of total supply) is reserved for direct supply throws to verified Solana traders with documented negative PnL.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-amber-400 font-mono">
              ✓ Verified On-Chain Throws
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-950/40 backdrop-blur-md border border-slate-800/80 hover:border-amber-500/40 rounded-3xl p-6 transition shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-bl-full pointer-events-none group-hover:bg-amber-500/20 transition"></div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-4 font-black text-xl">
              30%
            </div>
            <h3 className="text-xl font-bold text-white">Bonding Curve & DEX Liquidity</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              300,000,000 $CATBALL (30% of total supply) powers the initial pump.fun bonding curve and auto-migrates to Raydium LP once bonding completes.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-amber-300 font-mono">
              ✓ Locked LP Tokens
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-950/40 backdrop-blur-md border border-slate-800/80 hover:border-amber-500/40 rounded-3xl p-6 transition shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-yellow-500/10 rounded-bl-full pointer-events-none group-hover:bg-yellow-500/20 transition"></div>
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-4 font-black text-xl">
              10%
            </div>
            <h3 className="text-xl font-bold text-white">Automated Buyback Vault</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              100,000,000 $CATBALL (10% of total supply) held in the Buyback Vault to sponsor continuous market buys and green chart candle support.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-yellow-400 font-mono">
              ✓ Automated Market Buyback
            </div>
          </div>

        </div>

        {/* Interactive Buyback Simulator Box */}
        <div className="bg-slate-950/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Controls */}
            <div className="space-y-6 w-full lg:w-1/2">
              <div>
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold uppercase">
                  <Zap className="w-4 h-4" />
                  <span>Interactive Engine Simulator</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  Automated Market Buyback Pressure
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Drag the slider below to simulate how trading volume generates fees that buy $CATBALL back from the market.
                </p>
              </div>

              {/* Slider 1: 24h Volume */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Simulated 24h Trading Volume:</span>
                  <span className="text-amber-400 font-bold">${(isNaN(dailyVolumeUsd) ? 0 : dailyVolumeUsd).toLocaleString('en-US')} USD</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={dailyVolumeUsd}
                  onChange={(e) => setDailyVolumeUsd(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-900 cursor-pointer rounded-lg h-2"
                />
                <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                  <span>$10K</span>
                  <span>$250K</span>
                  <span>$500K</span>
                  <span>$1M</span>
                </div>
              </div>

              {/* Slider 2: Fee Allocation % */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Fee Allocated to Buyback:</span>
                  <span className="text-emerald-400 font-bold">{feePercentage.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={feePercentage}
                  onChange={(e) => setFeePercentage(Number(e.target.value))}
                  className="w-full accent-emerald-400 bg-slate-900 cursor-pointer rounded-lg h-2"
                />
              </div>
            </div>

            {/* Right Output Dashboard */}
            <div className="w-full lg:w-1/2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 font-mono">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Simulated On-Chain Output
              </h4>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className="text-[11px] text-slate-400">Daily Buyback Budget (USD):</p>
                <p className="text-2xl font-black text-amber-400 mt-0.5">
                  ${(isNaN(calculatedDailyFeeUsd) ? 0 : calculatedDailyFeeUsd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  ≈ {calculatedDailyFeeSol.toFixed(2)} SOL bought back daily from Raydium / pump.fun
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className="text-[11px] text-slate-400">Monthly Market Buyback Pressure:</p>
                <p className="text-2xl font-black text-emerald-400 mt-0.5">
                  ${(isNaN(monthlyBuybackUsd) ? 0 : monthlyBuybackUsd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Accumulated price floor support over 30 days
                </p>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-amber-400 font-semibold pt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>100% On-Chain Transparent & Verifiable</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
