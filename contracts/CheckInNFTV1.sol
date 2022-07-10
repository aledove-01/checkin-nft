// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//import "@openzeppelin/contracts/security/Pausable.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
//import "@openzeppelin/contracts/utils/Counters.sol";


contract CheckInNFTV1 is ERC721, ERC721Enumerable {
    //using Counters for Counters.Counter;
   

    uint256 private _tokenIdCounter;

    constructor() ERC721("CheckInNFTV1", "CIN") {
        _tokenIdCounter = 0;
    }

    function getCounter() public view returns(uint256) {
        return _tokenIdCounter;
    }

    function mint(address _to) internal returns (uint256) {
        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;
        _mint(_to, tokenId);
        //_setTokenURI(tokenId, uri);
        return tokenId;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


}