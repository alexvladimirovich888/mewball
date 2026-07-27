import React, { useState } from "react";
import { Wallet, ExternalLink, Copy, Check, ShieldCheck, ChevronDown, LogOut, RefreshCw } from "lucide-react";
import { ConnectedWallet } from "../types";
import { connectPhantomWallet, connectSolflareWallet } from "../services/solanaService";

const LOGO_URL = "https://s6.iimage.su/s/27/th_gxU9k10xFX5Yy1nd7zV16WcZe0aj1qzorIZiOt825.png";

interface HeaderProps {
  wallet: ConnectedWallet | null;
  setWallet: (wallet: ConnectedWallet | null) => void;
  tokenMint: string;
}

export const Header: React.FC<HeaderProps> = ({ wallet, setWallet, tokenMint }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleConnectPhantom = async () => {
    setIsConnecting(true);
    setErrorMsg(null);
    try {
      const w = await connectPhantomWallet();
      setWallet(w);
      setIsDropdownOpen(false);
    } catch (e: any) {
      setErrorMsg(e.message || "Failed to connect Phantom");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnectSolflare = async () => {
    setIsConnecting(true);
    setErrorMsg(null);
    try {
      const w = await connectSolflareWallet();
      setWallet(w);
      setIsDropdownOpen(false);
    } catch (e: any) {
      setErrorMsg(e.message || "Failed to connect Solflare");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setWallet(null);
    setIsDropdownOpen(false);
  };

  const copyAddress = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const pumpFunUrl = tokenMint && tokenMint.length >= 32
    ? `https://pump.fun/coin/${tokenMint}`
    : `https://pump.fun/board`;

  return (
    <header className="w-full z-50 py-2 sm:py-3 px-1">
      <div className="flex items-center justify-between gap-2">
        
        {/* Brand Logo & Ticker */}
        <div className="flex items-center space-x-3">
          <img 
            src={LOGO_URL} 
            alt="Catball Logo" 
            className="w-11 h-11 object-contain shrink-0 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-900">
                CAT<span className="text-neon-gradient">BALL</span>
              </span>
              <span className="bg-neon-gradient text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide shadow-neon-glow">
                $CATBALL
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block font-medium">
              Solana Rekt Trader Onboarding & Catball Roll
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-2 sm:space-x-3">

          {/* Catch $CATBALL on pump.fun */}
          <a
            href={pumpFunUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-neon-gradient hover:opacity-95 text-white font-black text-xs tracking-wider uppercase transition active:scale-95 shadow-neon-glow"
          >
            <span>Catch $CATBALL</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Wallet Connection */}
          {wallet ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl text-xs text-slate-900 transition font-bold border border-purple-200"
              >
                <div className="w-2 h-2 rounded-full bg-[#00CEC9]"></div>
                <span className="text-[#6C5CE7]">{wallet.shortAddress}</span>
                <span className="text-slate-500 pl-1 hidden sm:inline">
                  {wallet.solBalance} SOL
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl p-3 z-50 text-xs space-y-2 border border-slate-100">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Connected Wallet</p>
                    <p className="text-slate-900 font-mono text-[11px] truncate mt-0.5">{wallet.publicKey}</p>
                    <p className="text-emerald-600 font-bold mt-1">{wallet.solBalance} SOL Balance</p>
                  </div>

                  <button
                    onClick={copyAddress}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition"
                  >
                    <span className="flex items-center space-x-2">
                      <Copy className="w-3.5 h-3.5 text-orange-500" />
                      <span>Copy Address</span>
                    </span>
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                  </button>

                  <a
                    href={`https://solscan.io/account/${wallet.publicKey}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition"
                  >
                    <span className="flex items-center space-x-2">
                      <ExternalLink className="w-3.5 h-3.5 text-orange-500" />
                      <span>View on Solscan</span>
                    </span>
                  </a>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={handleDisconnect}
                      className="w-full flex items-center space-x-2 px-2.5 py-2 rounded-lg hover:bg-rose-50 text-rose-600 font-bold transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Disconnect Wallet</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                disabled={isConnecting}
                className="flex items-center space-x-2 bg-neon-gradient hover:opacity-95 px-4 py-2 rounded-xl text-xs font-bold text-white transition active:scale-95 shadow-neon-glow"
              >
                {isConnecting ? (
                  <RefreshCw className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <Wallet className="w-4 h-4 text-white" />
                )}
                <span>Connect Wallet</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/80" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl p-3 z-50 text-xs space-y-2 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 py-1">
                    Select Solana Wallet
                  </p>

                  <button
                    onClick={handleConnectPhantom}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center font-bold text-purple-600">
                        👻
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Phantom Wallet</p>
                        <p className="text-[10px] text-slate-500">Browser Extension / Mobile</p>
                      </div>
                    </div>
                    <ShieldCheck className="w-4 h-4 text-orange-500" />
                  </button>

                  <button
                    onClick={handleConnectSolflare}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                        🔥
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Solflare Wallet</p>
                        <p className="text-[10px] text-slate-500">Solana Web3 Extension</p>
                      </div>
                    </div>
                    <ShieldCheck className="w-4 h-4 text-orange-500" />
                  </button>

                  {errorMsg && (
                    <div className="p-2 rounded-lg bg-rose-50 text-rose-600 text-[11px]">
                      {errorMsg}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
