import React, { useState } from "react";
import { Search, ShieldCheck, AlertCircle, Sparkles, CheckCircle2, DollarSign, Wallet, ArrowRight, Loader2, Award } from "lucide-react";
import { ConnectedWallet, WalletPnLResult } from "../types";
import { analyzeWalletPnL } from "../services/solanaService";

interface PnLCheckerProps {
  connectedWallet: ConnectedWallet | null;
}

export const PnLChecker: React.FC<PnLCheckerProps> = ({ connectedWallet }) => {
  const [walletInput, setWalletInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepMsg, setStepMsg] = useState("");
  const [result, setResult] = useState<WalletPnLResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleUseConnected = () => {
    if (connectedWallet) {
      setWalletInput(connectedWallet.publicKey);
    }
  };

  const handleCheckPnL = async (e: React.FormEvent) => {
    e.preventDefault();
    const addr = walletInput.trim() || (connectedWallet?.publicKey || "");

    if (!addr || addr.length < 32) {
      setError("Please enter a valid Solana wallet address (32+ characters).");
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);
    setIsRegistered(false);

    try {
      setStepMsg("Connecting to Solana RPC Connection...");
      await new Promise((r) => setTimeout(r, 600));

      setStepMsg("Scanning SPL Memecoin Swap Signatures...");
      await new Promise((r) => setTimeout(r, 700));

      setStepMsg("Calculating Verified Trading Losses & Rekt Depth...");
      const res = await analyzeWalletPnL(addr);

      setResult(res);
    } catch (err: any) {
      setError(err.message || "Failed to analyze wallet trading history.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterAirdrop = () => {
    setIsRegistered(true);
  };

  return (
    <div className="py-2 px-1 space-y-3">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-neon-gradient text-white text-[10px] font-bold uppercase tracking-wider shadow-neon-glow">
          <DollarSign className="w-3 h-3 text-white" />
          <span>On-Chain Loss Verification</span>
        </div>
        <h2 className="text-xs sm:text-sm font-bold text-slate-800">
          Are You Rekt Enough to Catch the Ball?
        </h2>
      </div>

      {/* Input Box Form */}
      <form onSubmit={handleCheckPnL} className="space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={walletInput}
              onChange={(e) => setWalletInput(e.target.value)}
              placeholder="Paste Solana wallet address..."
              className="w-full bg-slate-100 border-none px-3 py-2 rounded-xl text-xs font-mono text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#6C5CE7]"
            />
            
            {connectedWallet && (
              <button
                type="button"
                onClick={handleUseConnected}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-purple-100 text-[#6C5CE7] text-[10px] font-bold flex items-center space-x-1 transition hover:bg-purple-200"
              >
                <Wallet className="w-2.5 h-2.5" />
                <span>Autofill</span>
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-neon-gradient hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-1 shrink-0 active:scale-95 disabled:opacity-50 shadow-neon-glow"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Check PnL</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-2 rounded-lg bg-pink-50 text-[#E84393] text-[11px] flex items-center space-x-1.5 font-bold">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </form>

      {/* Loading Progress State */}
      {loading && (
        <div className="p-3 rounded-xl bg-slate-50 text-center space-y-1 border border-purple-100">
          <Loader2 className="w-5 h-5 text-[#6C5CE7] animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-800 font-mono">{stepMsg}</p>
        </div>
      )}

      {/* Results Box */}
      {result && !loading && (
        <div className="pt-2 space-y-2 animate-in fade-in duration-300">
          
          <div className={`p-2.5 rounded-xl flex items-start space-x-2 ${
            result.isRekt 
              ? "bg-purple-50 border border-purple-200 text-slate-900"
              : "bg-slate-50 border border-slate-200 text-slate-800"
          }`}>
            {result.isRekt ? (
              <CheckCircle2 className="w-4 h-4 text-[#E84393] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#6C5CE7] shrink-0 mt-0.5" />
            )}
            <div>
              <h3 className="font-bold text-xs text-slate-900 font-mono">
                {result.verdict}
              </h3>
              <p className="text-[10px] text-slate-600">
                Wallet: <span className="font-mono text-slate-900 font-bold">{result.wallet}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="text-left">
              <p className="text-[9px] font-bold uppercase text-slate-400">Verified PnL</p>
              <p className={`text-sm font-black font-mono ${result.isRekt ? "text-[#E84393]" : "text-[#00CEC9]"}`}>
                {(result?.verifiedPnL ?? 0) < 0 ? `-$${Math.abs(result?.verifiedPnL ?? 0).toLocaleString()}` : "$0.00"}
              </p>
            </div>

            <div className="text-left">
              <p className="text-[9px] font-bold uppercase text-slate-400">Rekt Score</p>
              <p className="text-sm font-black text-neon-gradient font-mono">{result.rektScore}/100</p>
            </div>

            <div className="text-left">
              <p className="text-[9px] font-bold uppercase text-slate-400">Rank</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">{result.eligibleTier}</p>
            </div>

            <div className="text-left">
              <p className="text-[9px] font-bold uppercase text-slate-400">Catball Supply</p>
              <p className="text-sm font-black text-neon-gradient font-mono">
                +{((result?.eligibleCatballAmount ?? result?.eligibleFomoballAmount) ?? 0).toLocaleString()}
              </p>
            </div>
          </div>

          {result.isRekt && (
            <div>
              {isRegistered ? (
                <div className="p-2 rounded-xl bg-purple-50 text-[#6C5CE7] border border-purple-200 text-center font-bold text-xs flex items-center justify-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#E84393]" />
                  <span>Catball Caught! Wallet queued for next supply throw.</span>
                </div>
              ) : (
                <button
                  onClick={handleRegisterAirdrop}
                  className="w-full py-2.5 rounded-xl bg-neon-gradient hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-1.5 active:scale-98 shadow-neon-glow"
                >
                  <Award className="w-4 h-4" />
                  <span>Queue Wallet to Catch $CATBALL Supply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
