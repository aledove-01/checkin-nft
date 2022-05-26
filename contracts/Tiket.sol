// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./CheckInNFTV1.sol";
import "./GenTiketURI.sol";

contract Tiket is CheckInNFTV1 {

    using GenTiketURI for string;

    function NewTiket( ) public returns (uint) {
      
       super.mint(msg.sender,GenTiketURI.genUri(GenTiketURI.SVGParams('descEvent','dateEvent',msg.sender,super.getCounter(),'','','','')));
       return super.getCounter();
    }
}