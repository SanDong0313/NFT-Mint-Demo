import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
    supportedChainIds: [97]
})

export const walletconnect = new WalletConnectConnector({
    rpc: {
        // 1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
    },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: 15000
})