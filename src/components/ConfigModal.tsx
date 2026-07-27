import React, { useState } from "react";
import { X, Save, Zap, AlertCircle, RefreshCw } from "lucide-react";

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenMint: string;
  setTokenMint: (mint: string) => void;
  distributorWallet: string;
  setDistributorWallet: (wallet: string) => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  tokenMint,
  setTokenMint,
  distributorWallet,
  setDistributorWallet
}) => {
  const [mintInput, setMintInput] = useState(tokenMint);
  const [distributorInput, setDistributorInput] = useState(distributorWallet);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setTokenMint(mintInput.trim());
    setDistributorWallet(distributorInput.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative border border-slate-100">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div>
          <div className="flex items-center space-x-2 text-[#6C5CE7] font-bold text-xs uppercase mb-1">
            <Zap className="w-4 h-4 text-[#E84393]" />
            <span>Developer / Inspector Configuration</span>
          </div>
          <h3 className="text-xl font-black text-slate-900">
            Solana $CATBALL Environment Setup
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Configure the mainnet token Contract Address (CA) or distributor wallet. All metrics and RPC feeds will adapt instantly.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          
          {/* TOKEN_MINT */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-700">
              TOKEN_MINT (Contract Address / CA)
            </label>
            <input
              type="text"
              value={mintInput}
              onChange={(e) => setMintInput(e.target.value)}
              placeholder="e.g. CatBall111111111111111111111111111111111111"
              className="w-full bg-slate-100 focus:bg-white border focus:border-[#6C5CE7] px-3.5 py-2.5 rounded-xl text-xs font-mono text-slate-900 outline-none transition"
            />
            <p className="text-[10px] text-slate-400">
              Leave blank if token is not yet deployed on pump.fun to display "CA Launching Soon" state.
            </p>
          </div>

          {/* DISTRIBUTOR_WALLET */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-700">
              DISTRIBUTOR_WALLET (Ball-Throw Sender)
            </label>
            <input
              type="text"
              value={distributorInput}
              onChange={(e) => setDistributorInput(e.target.value)}
              placeholder="e.g. CatDist11111111111111111111111111111111111"
              className="w-full bg-slate-100 focus:bg-white border focus:border-[#6C5CE7] px-3.5 py-2.5 rounded-xl text-xs font-mono text-slate-900 outline-none transition"
            />
            <p className="text-[10px] text-slate-400">
              Wallet address emitting $CATBALL supply throw transactions on Solana mainnet.
            </p>
          </div>

          <div className="p-3 bg-purple-50/60 rounded-xl text-[11px] text-slate-600 space-y-1 border border-purple-100">
            <p className="font-bold text-slate-800">RPC Configuration:</p>
            <p className="font-mono text-[#6C5CE7] text-[10px] truncate font-bold">
              Helius Mainnet RPC Proxy Active
            </p>
          </div>

          {saved && (
            <div className="p-2 bg-purple-100 text-[#6C5CE7] rounded-xl text-xs font-bold text-center">
              Configuration Saved! Updating Live Metrics...
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-neon-gradient text-white font-bold text-xs uppercase tracking-wider transition flex items-center space-x-1.5 shadow-neon-glow"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply Config</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
