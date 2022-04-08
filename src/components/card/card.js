import { Styles } from "./styles";

const Card = ({ data, price }) => {
    return (
        <Styles>
            <div className="nft-card">
                <img src={`https://ipfs.io/ipfs/${data.image.split('://')[1]}`} width="100%" alt="" />
                <div className="p-2">
                    <p className="d-flex justify-content-between mb-1">
                        <span className="color-white">{data.name}</span>
                        <span className="color-white">{Number(price) / Math.pow(10, 18)} BNB</span>
                    </p>
                    <div className="attributes d-flex align-items-center justify-content-between">
                        <span className="mb-1 color-green">Class</span>
                        <span className="mb-1 color-white">{data.attributes.filter(attr => attr.trait_type === 'Class')[0].value}</span>
                    </div>
                </div>
            </div>
        </Styles>
    )
}

export default Card;