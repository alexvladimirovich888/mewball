export interface ProjectConfig {
  TOKEN_MINT: string;
  DISTRIBUTOR_WALLET: string;
  HELIUS_RPC_URL: string;
  DEXSCREENER_API: string;
}

export interface TokenStats {
  found: boolean;
  ca: string;
  symbol?: string;
  name?: string;
  priceUsd?: number;
  priceNative?: number;
  marketCap?: number;
  volume24h?: number;
  priceChange24h?: number;
  liquidityUsd?: number;
  dexUrl?: string;
  pairAddress?: string;
  dexId?: string;
  lastUpdated?: number;
  message?: string;
}

export interface DistributionTx {
  signature: string;
  slot: number;
  blockTime?: number;
  timestamp: number;
  ageStr: string;
  status: "Success" | "Failed";
  memo?: string;
  amount: number;
  solscanTx: string;
  solscanAddress: string;
  recipient?: string;
}

export interface WalletPnLResult {
  success: boolean;
  wallet: string;
  solBalance: number;
  txCount: number;
  failedTxs: number;
  isRekt: boolean;
  verifiedPnL: number;
  rektScore: number;
  eligibleTier: string;
  eligibleFomoballAmount?: number;
  eligibleCatballAmount?: number;
  verdict: string;
  breakdown: {
    analyzedTransactions: number;
    memecoinSwapsAnalyzed: number;
    estimatedSolSpent: number;
    claimStatus: string;
  };
}

export interface ConnectedWallet {
  publicKey: string;
  shortAddress: string;
  solBalance: number;
  fomoballBalance?: number;
  catballBalance?: number;
  walletType: "phantom" | "solflare" | "custom";
}
