import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import useAuth from "../../hook/auth";
import { getWeb3 } from "../../utils/web3";
import { injected } from '../../utils/connector';
import { requestChangeNetwork } from "../../utils/network";
import contractAbi from '../../ABI/mint.json';
import { Styles } from "./styles";
import { baseURI, contract_address } from "../../config";
import axios from "axios";
import Card from "../../components/card/card";

const Mint = () => {
    const { connectWallet, disconnectWallet } = useAuth();
    const { account, chainId, active } = useWeb3React();

    const [price, setPrice] = useState(0);
    const [pending, setPending] = useState(false);
    const [myNFTs, setMyNFTs] = useState([])

    useEffect(() => {
        if (window.ethereum === undefined) {
            toast.warning("Please install Metamask wallet");
            return;
        }
        if (window.ethereum.networkVersion !== 97) {
            requestChangeNetwork('0x61');
        }
    })

    useEffect(() => {
        const getData = async () => {
            try {
                const web3 = getWeb3();
                const nftContract = new web3.eth.Contract(contractAbi, contract_address);
                const res = await nftContract.methods.getTokenPrice().call();
                setPrice(res);
            } catch (err) {
                console.log(err);
            }
        }
        if (active) {
            getData();
            getMyCollections();
        }
    }, [active])

    useEffect(() => {
        console.log(myNFTs)
    }, [myNFTs])

    const handleMint = async () => {
        if (!active) {
            toast.warning("Please connect metamask");
            return;
        }
        try {
            const web3 = getWeb3();
            const nftContract = new web3.eth.Contract(contractAbi, contract_address);
            await nftContract.methods.mintNFT(1).send({
                from: account,
                value: price
            })
            getMyCollections();
        } catch (err) {

        }
    }

    const getMyCollections = async () => {
        try {
            setPending(true);
            const web3 = getWeb3();
            const nftContract = new web3.eth.Contract(contractAbi, contract_address);
            const ownerNFTs = await nftContract.methods.balanceOf(account).call()
            let tokenId;
            let metadata;
            let metadata_array = new Array();
            for (let i = 0; i < ownerNFTs; i++) {
                tokenId = await nftContract.methods.tokenOfOwnerByIndex(account, i).call();
                metadata = await axios.get(`${baseURI}${tokenId}.json`);
                metadata_array.push(metadata.data)
            }
            setMyNFTs(metadata_array)
            setPending(false);
        } catch (err) {
            setPending(false);
            console.log(err);
        }
    }

    return (
        <Styles>
            <div className="container py-4">
                <div className="row my-4">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <Button variant="outline-warning" onClick={getMyCollections}>My Collections</Button>
                        <Button variant="outline-warning" onClick={handleMint}>Mint now</Button>
                        {
                            active ? (
                                <Button variant="outline-warning" onClick={() => disconnectWallet()}>
                                    {account.slice(0, 6)}...{account.slice(account.length - 4, account.length)}
                                </Button>
                            ) : (
                                <Button variant="outline-warning" onClick={() => connectWallet(injected)}>Connect Wallet</Button>
                            )
                        }
                    </div>
                </div>
                <div className="row my-4 collections position-relative p-4">
                    {
                        pending ? (
                            <div className="position-absolute d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
                                <Spinner variant="info" animation="border" />
                            </div>
                        ) : myNFTs.length > 0 && myNFTs.map((nft, index) => (
                            <div className="col-lg-2 col-md-3 col-6 p-3" key={index}>
                                <Card data={nft} price={price} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </Styles>
    )
}

export default Mint;