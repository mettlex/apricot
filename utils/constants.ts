export interface CryptoRpcEndpoint {
  name: string;
  url: string;
}

export const solanaRpcEndpoints: CryptoRpcEndpoint[] = [
  {
    name: "solana-mainnet-beta",
    url: "https://api.mainnet-beta.solana.com",
  },
  {
    name: "solana-projectserum",
    url: "https://solana-api.projectserum.com",
  },
];

export const ethereumCompatRpcEndpoints: CryptoRpcEndpoint[] = [
  {
    name: "cloudflare-ethereum",
    url: "https://cloudflare-eth.com",
  },
  {
    name: "polygon",
    url: "https://polygon-rpc.com",
  },
  {
    name: "binance-smart-chain",
    url: "https://bsc-dataseed.binance.org",
  },
  {
    name: "xdai",
    url: "https://rpc.xdaichain.com",
  },
  {
    name: "avalanche",
    url: "https://api.avax.network/ext/bc/C/rpc",
  },
  {
    name: "fantom",
    url: "https://rpc.ftm.tools",
  },
  {
    name: "kucoin",
    url: "https://rpc-mainnet.kcc.network",
  },
];
