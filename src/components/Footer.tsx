import React from "react";
import { ExternalLink } from "lucide-react";

const LOGO_URL = "https://s6.iimage.su/s/27/th_gxU9k10xFX5Yy1nd7zV16WcZe0aj1qzorIZiOt825.png";

interface FooterProps {
  tokenMint: string;
}

export const Footer: React.FC<FooterProps> = ({ tokenMint }) => {
  const solscanTokenUrl = tokenMint && tokenMint.length >= 32
    ? `https://solscan.io/token/${tokenMint}`
    : `https://solscan.io/`;

  const pumpFunUrl = tokenMint && tokenMint.length >= 32
    ? `https://pump.fun/coin/${tokenMint}`
    : `https://pump.fun/board`;

  return (
    <footer className="w-full py-2 px-1 text-xs text-slate-600">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-[11px]">
          <img src={LOGO_URL} alt="Catball" className="w-4 h-4 object-contain shrink-0" />
          <span className="font-extrabold text-slate-900">CATBALL ($CATBALL)</span>
          <span className="text-slate-400">• © 2026 Powered by Solana Web3</span>
        </div>

        <div className="flex items-center space-x-3 text-[11px] font-bold">
          <a
            href={solscanTokenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#6C5CE7] text-slate-700 flex items-center space-x-1 transition"
          >
            <span>Solscan</span>
            <ExternalLink className="w-3 h-3 text-[#6C5CE7]" />
          </a>
          <a
            href={pumpFunUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E84393] text-slate-700 flex items-center space-x-1 transition"
          >
            <span>pump.fun</span>
            <ExternalLink className="w-3 h-3 text-[#E84393]" />
          </a>
          <a
            href={`https://dexscreener.com/solana/${tokenMint || "pump"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00CEC9] text-slate-700 flex items-center space-x-1 transition"
          >
            <span>DexScreener</span>
            <ExternalLink className="w-3 h-3 text-[#00CEC9]" />
          </a>
        </div>
      </div>
    </footer>
  );
};

