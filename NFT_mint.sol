// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SimpleMint is ERC721("SimpleMint", "SMC"), ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Strings for uint256;

    event Mint(address indexed minter, uint256 tokenId);

    string public baseURI = "https://ipfs.io/ipfs/QmVaBgZGeu9Jey8cidv5xyHAteD2s7gP4uijBTSmZtbyVQ/";

    uint256 public BUY_LIMIT_PER_TX = 5;
    uint256 public MAX_NFT = 5000;
    uint256 public tokenPrice = 0.05 ether;

    constructor() {}

    function withdraw(address _to) public onlyOwner {
        uint256 balance = address(this).balance;
        payable(_to).transfer(balance);
    }

    function mintNFT(uint256 _numOfTokens) public payable {
        require(_numOfTokens <= BUY_LIMIT_PER_TX, "Can't mint above limit");
        require(
            totalSupply().add(_numOfTokens) <= MAX_NFT,
            "Purchase would exceed max supply of NFTs"
        );
        require(
            tokenPrice.mul(_numOfTokens) == msg.value,
            "Ether value sent is not correct"
        );

        for (uint256 i = 1; i <= _numOfTokens; i++) {
            _safeMint(msg.sender, totalSupply() + 1);

            emit Mint(msg.sender, totalSupply() + 1);
        }
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(currentBaseURI, tokenId.toString(), ".json")
                )
                : "";
    }

    function setTokenPrice(uint256 _price) public onlyOwner {
        tokenPrice = _price;
    }

    function getTokenPrice() public view returns (uint256) {
        return tokenPrice;
    }

    function setBaseURI(string memory _pBaseURI) external onlyOwner {
        baseURI = _pBaseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // Standard functions to be overridden
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool){
        return super.supportsInterface(interfaceId);
    }
}
