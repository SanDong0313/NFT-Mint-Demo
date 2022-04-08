export const requestChangeNetwork = async (chainId) => {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainId }],
        });
    } catch (error) {
        if (error.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: chainId,
                            rpcUrl: getrpcURLWithChainId(chainId),
                        },
                    ],
                });
            } catch (addError) {
                console.error(addError);
            }
        }
        console.error(error);
    }
}

export const getrpcURLWithChainId = (id) => {
    if (parseInt(id) === 56) return "https://bsc-dataseed.binance.org/";
    if (parseInt(id) === 97) return "https://data-seed-prebsc-1-s1.binance.org:8545/";
}

