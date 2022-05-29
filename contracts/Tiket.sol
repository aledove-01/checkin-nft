// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./CheckInNFTV1.sol";
import "./GenTiketURI.sol";
import "./Events.sol";

contract Tiket is CheckInNFTV1 {

    using GenTiketURI for string;
    address _owner;
    Events cEvt;
    constructor(address _address)  {
        //cEvt = Events(_address);
        _owner = _address;
    }
    function NewTiket(uint _idEvt) payable public returns (uint) {
        //verificar el iddel evento
         // = new Events();
        Events.EventSt memory eventSt = cEvt.getEventById(msg.sender,_idEvt);
        //Events.EventSt memory eventSt = []; 
        
        /*(bool success, bytes memory data) = _owner.call(abi.encodeWithSignature("getEventById",msg.sender,_idEvt));
        require(success,"Error en llamada ABI");

        (uint id, string memory namEvt, uint cantTokenMax, uint price, 
        uint dateOff,
        uint dateEvent,
        uint contTikets, //counter minted tikets
        string memory urlImg) = abi.decode(data, (uint, string, uint,
        uint,
        uint,
        uint,
        uint, //counter minted tikets
        string));*/

        //Events.EventSt memory eventSt = cEvt.getEventById(msg.sender,1);
        require(eventSt.id !=0,"Event not exist");

        //cobrar fee
        //
        super.mint(msg.sender,GenTiketURI.genUri(GenTiketURI.SVGParams('descEvent','dateEvent',msg.sender,super.getCounter(),'','','','')));
        return super.getCounter();
    }
}
