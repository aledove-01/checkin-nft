// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Event {
    event NewEvent(uint id, string name , uint cantTokenMax, uint price, uint dateOff, uint dateEvent);
    
    string  FEE_ACCOUNT = ''; //wallet dev
    uint64   FEE = 50000000000000000; //porcent 0.5%

    mapping (address => EventSt[]) private EventsArr;
    
    struct EventSt{
        uint id;
        string name;
        uint cantTokenMax;
        uint price;
        uint dateOff;
        uint dateEvent;
        uint idMinTiket;
        uint idMaxTiket;
    }

    function calcFee(uint256 _price) view public returns (uint256){
        return (_price*FEE)/(100*10**18); //cal porc
    }

    function addEvent(uint _id, string memory _name , uint _cantTokenMax, uint _price, uint _dateOff, uint _dateEvent)  public {
        EventsArr[msg.sender].push(EventSt(_id,_name,_cantTokenMax,_price,_dateOff,_dateEvent));
        emit NewEvent(_id,_name,_cantTokenMax,_price,_dateOff,_dateEvent);
    }

    function getEvent() view  public returns(EventSt[] memory){
        return EventsArr[msg.sender];
    }

    function countEvent() view  public returns(uint){
        return EventsArr[msg.sender].length;
    }
    
}