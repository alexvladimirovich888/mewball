import React, { useState, useEffect } from "react";
import { ArrowUpRight, RefreshCw, Radio, Search, Activity } from "lucide-react";
import { DistributionTx } from "../types";
import { fetchDistributions, formatAddress } from "../services/solanaService";

interface AirdropFeedProps {
  distributorWallet: string;
  tokenMint: string;
  setDistributorWallet: (wallet: string) => void;
}

export const AirdropFeed: React.FC<AirdropFeedProps> = ({ distributorWallet, tokenMint, setDistributorWallet }) => {
  const [txs, setTxs] = useState<DistributionTx[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeAddress, setActiveAddress] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const loadFeed = async () => {
    setLoading(true);
    try {
      const data = await fetchDistributions(distributorWallet, tokenMint);
      setTxs(data.transactions);
      setActiveAddress(data.address);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
    const interval = setInterval(() => {
      loadFeed();
    }, 15000);
    return () => clearInterval(interval);
  }, [distributorWallet, tokenMint]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim().length >= 32) {
      setDistributorWallet(customInput.trim());
      setShowSearch(false);
    }
  };

  return (
    <div className="py-2 px-1 flex flex-col h-full min-h-0 gap-3">
      
      {/* Section Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
            Live $CATBALL Ball-Throw Feed
          </h2>
        </div>

        <div className="flex items-center space-x-1.5 shrink-0">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-purple-50 transition"
            title="Inspect Wallet"
          >
            <Search className="w-3.5 h-3.5 text-[#6C5CE7]" />
          </button>

          <button
            onClick={loadFeed}
            disabled={loading}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-[#6C5CE7] hover:bg-purple-50 flex items-center space-x-1 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Custom Distributor Search Box */}
      {showSearch && (
        <form onSubmit={handleCustomSubmit} className="p-2 rounded-xl bg-slate-100 flex gap-2 shrink-0">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Enter Distributor Wallet or Mint..."
            className="flex-1 bg-transparent border-none px-2 py-1 text-xs font-mono text-slate-900 outline-none focus:ring-1 focus:ring-[#6C5CE7]"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-neon-gradient text-white font-bold text-xs rounded-lg transition shadow-neon-glow"
          >
            Track
          </button>
        </form>
      )}

      {/* Transactions List / Table */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-1 min-h-0">
        {txs && txs.length > 0 ? (
          <div className="space-y-2 font-mono text-xs">
            {txs.map((tx, idx) => (
              <div 
                key={tx?.signature || idx} 
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-purple-200 transition flex items-center justify-between gap-2"
              >
                <div className="overflow-hidden">
                  <div className="flex items-center space-x-1.5 text-slate-900 font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#00CEC9] shrink-0"></span>
                    <a
                      href={tx?.solscanAddress || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#6C5CE7] truncate"
                    >
                      {formatAddress(tx?.recipient || tx?.solscanAddress?.split("/").pop() || "Recipient")}
                    </a>
                  </div>
                  <p className="text-[10px] text-slate-500 font-sans mt-0.5">
                    {tx?.ageStr || "Recent"}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-bold text-neon-gradient">
                    +{(tx?.amount ?? 0).toLocaleString()} $CATBALL
                  </p>
                  <a
                    href={tx?.solscanTx || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-0.5 text-[10px] text-[#6C5CE7] hover:underline font-sans font-bold"
                  >
                    <span>Solscan</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 text-slate-500">
            <Activity className="w-7 h-7 text-[#6C5CE7] animate-bounce" />
            <p className="text-xs font-bold text-slate-800">
              Rolling the ball... Awaiting next supply throw!
            </p>
            <p className="text-[11px] text-slate-500 max-w-xs">
              $CATBALL supply throws stream live as soon as tokens are distributed on Solana mainnet.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

