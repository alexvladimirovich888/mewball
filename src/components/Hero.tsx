import React, { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, ExternalLink, Flame, ShieldAlert, Search } from "lucide-react";
import { TokenStats } from "../types";
import { fetchTokenStats } from "../services/solanaService";

const LOGO_URL = "https://s6.iimage.su/s/27/th_gxU9k10xFX5Yy1nd7zV16WcZe0aj1qzorIZiOt825.png";

interface HeroProps {
  tokenMint: string;
  setTokenMint: (mint: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ tokenMint, setTokenMint }) => {
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<TokenStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [customCaInput, setCustomCaInput] = useState("");
  const [isInspecting, setIsInspecting] = useState(false);

  const isCaReady = Boolean(tokenMint && tokenMint.length >= 32);

  const loadStats = async (caToFetch: string) => {
    if (!caToFetch || caToFetch.length < 32) {
      setStats({
        found: false,
        ca: caToFetch,
        message: "CA Launching Soon"
      });
      return;
    }

    setLoading(true);
    try {
      const data = await fetchTokenStats(caToFetch);
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats(tokenMint);
  }, [tokenMint]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (tokenMint && tokenMint.length >= 32) {
            loadStats(tokenMint);
          }
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [tokenMint]);

  const copyCa = () => {
    if (tokenMint) {
      navigator.clipboard.writeText(tokenMint);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApplyCustomCa = (e: React.FormEvent) => {
    e.preventDefault();
    if (customCaInput.trim().length >= 32) {
      setTokenMint(customCaInput.trim());
      setIsInspecting(false);
    }
  };

  const formatUsd = (num?: number) => {
    if (num === undefined || num === null) return "$0.00";
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `$${(num / 1_000).toFixed(2)}K`;
    return `$${num.toFixed(4)}`;
  };

  const formatPrice = (price?: number) => {
    if (!price || isNaN(price)) return "$0.00000000";
    if (price < 1) {
      return `$${Number(price).toFixed(8)}`;
    }
    return `$${Number(price).toFixed(4)}`;
  };

  return (
    <div className="py-2 px-1 flex flex-col justify-between gap-3">
      
      {/* Header Info */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-neon-gradient text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-neon-glow">
            <Flame className="w-3.5 h-3.5 text-white" />
            <span>Solana Rekt Trader Catball Roll Engine</span>
          </div>

          <button
            onClick={() => loadStats(tokenMint)}
            disabled={loading}
            className="flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#6C5CE7] ${loading ? "animate-spin" : ""}`} />
            <span>{countdown}s</span>
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Rolling the Catball{" "}
          <span className="text-neon-gradient">
            to Rekt Traders.
          </span>
        </h1>

        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
          Trading in the red? We throw $CATBALL directly into liquidation-hit wallets to share our supply. 100% of fees go to chart Buybacks.
        </p>
      </div>

      {/* Contract Address Display Bar */}
      <div className="flex items-center justify-between gap-2 py-1">
        <div className="flex items-center space-x-2 overflow-hidden">
          <img src={LOGO_URL} alt="Catball" className="w-7 h-7 object-contain shrink-0" />
          <div className="overflow-hidden">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Contract Address</span>
              {isCaReady ? (
                <span className="px-2 py-0.2 rounded-full text-[9px] bg-[#00CEC9]/20 text-[#00CEC9] font-bold">
                  Live
                </span>
              ) : (
                <span className="px-2 py-0.2 rounded-full text-[9px] bg-pink-100 text-[#E84393] font-bold flex items-center gap-0.5">
                  <ShieldAlert className="w-2.5 h-2.5" />
                  Soon
                </span>
              )}
            </div>
            <p className="font-mono text-xs sm:text-sm font-bold text-slate-900 truncate">
              {isCaReady ? tokenMint : "Launching on pump.fun soon..."}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 shrink-0">
          {isCaReady && (
            <button
              onClick={copyCa}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-900 transition active:scale-95 flex items-center space-x-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00CEC9]" /> : <Copy className="w-3.5 h-3.5 text-[#6C5CE7]" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          )}

          <button
            onClick={() => setIsInspecting(!isInspecting)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-purple-50 transition"
            title="Inspect Custom CA"
          >
            <Search className="w-4 h-4 text-[#6C5CE7]" />
          </button>
        </div>
      </div>

      {/* Custom CA Inspector Input Drawer */}
      {isInspecting && (
        <form onSubmit={handleApplyCustomCa} className="flex gap-2">
          <input
            type="text"
            value={customCaInput}
            onChange={(e) => setCustomCaInput(e.target.value)}
            placeholder="Paste Solana token CA..."
            className="flex-1 bg-slate-100 border-none px-3 py-2 rounded-xl text-xs font-mono text-slate-900 outline-none focus:ring-2 focus:ring-[#6C5CE7]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-neon-gradient text-white font-bold text-xs rounded-xl transition shadow-neon-glow"
          >
            Apply
          </button>
        </form>
      )}

      {/* 4 Market Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
        <div className="text-left">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Market Cap</p>
          <p className="text-lg sm:text-xl font-black text-slate-900 font-mono mt-0.5">
            {stats?.found ? formatUsd(stats.marketCap) : "$0.00"}
          </p>
        </div>

        <div className="text-left">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Catball Price</p>
          <p className="text-lg sm:text-xl font-black text-neon-gradient font-mono mt-0.5">
            {stats?.found ? formatPrice(stats.priceUsd) : "$0.0000"}
          </p>
        </div>

        <div className="text-left">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">24h Volume</p>
          <p className="text-lg sm:text-xl font-black text-slate-900 font-mono mt-0.5">
            {stats?.found ? formatUsd(stats.volume24h) : "$0.00"}
          </p>
        </div>

        <div className="text-left">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Buyback Fees</p>
          <p className="text-lg sm:text-xl font-black text-[#00CEC9] font-mono mt-0.5">
            {stats?.found ? formatUsd((stats.volume24h || 0) * 0.01) : "$0.00"}
          </p>
        </div>
      </div>

    </div>
  );
};

