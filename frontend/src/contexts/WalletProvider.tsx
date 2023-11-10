import { FC, ReactNode } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { MUMBAI_RPC } from "../config/config";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, polygon],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: MUMBAI_RPC,
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "SyrupPool",
  projectId: "fdbb4088b7072e373ec7f8e28abc324c",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

interface WalletProviderProps {
  children: ReactNode;
}

const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WalletProvider;
