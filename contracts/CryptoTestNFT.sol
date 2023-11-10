// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoTestNFT is ERC721Enumerable, Ownable {

    // @notice NFT Mint Price is hardcoded as 0.02 ETH
    uint256 public MINT_PRICE = 0.02 ether;
    // @notice Total_Supply as 10 
    uint256 public TOTAL_SUPPLY = 10;

    // @notice baseTokenURI to store the Metadata IPFS URI
    string _baseTokenURI;

    constructor(string memory baseURI) 
        ERC721("CryptoTest NFT", "CTN") 
        Ownable(msg.sender)  
    {
        setBaseURI(baseURI);
    }

    /// @notice Mint function for minting NFT.
    function mint() public payable {
        // Get this NFT collections TotalSupply - already minted amount.
        uint256 totalMinted = totalSupply();

        // Check if total mint amount is exceed the TotalSupply.
        require(totalMinted + 1 <= TOTAL_SUPPLY, "Mint Amount Exceed!");

        // Check if mint price is sufficient.
        require(msg.value >= MINT_PRICE, "Insufficient Price");

        // Mint new NFT to the msg.sender.
        _safeMint(msg.sender, totalMinted + 1);

    }

    /// @notice Get base URI storing the NFT metadata.
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    /// @notice Set new base URI for NFT metadata.
    /// @param baseURI  new baseTokenURI stored the NFT metadata.
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    /// @notice Withdraw all Balance of this contract to Owner.
    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
   
}