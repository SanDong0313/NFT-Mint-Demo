import { useWeb3React } from "@web3-react/core"
import { useEffect } from "react";

const useAuth = () => {
    const { account, chainId, activate, deactivate } = useWeb3React();

    const connectWallet = async (connector) => {
        try {
            await activate(connector);
        } catch (err) {
            console.log(err);
        }
    }

    const disconnectWallet = async () => {
        try {
            deactivate();
        } catch (err) {
            console.log(err);
        }
    }

    return { connectWallet, disconnectWallet }
}

export default useAuth;