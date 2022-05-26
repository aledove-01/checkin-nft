// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Event {
    event NewEvent(uint id, string name , uint cantTokenMax, uint price, uint dateOff, uint dateEvent, string urlImg);
    
    string  FEE_ACCOUNT = ''; //wallet dev
    uint64   FEE = 0.2 ether; //porcent 0.2%

    mapping (address => EventSt[]) private EventsArr;
    
    struct EventSt{
        uint id;
        string name;
        uint cantTokenMax;
        uint price;
        uint dateOff;
        uint dateEvent;
        uint contTikets; //counter minted tikets
        string urlImg;
    }

    function calcFee(uint256 _price, uint _cantTokenMax) public view returns (uint256){
        return ((_price*_cantTokenMax)*FEE)/(100); //cal porc
    }

    function addEvent(uint _id, string memory _name , uint _cantTokenMax, uint _price, uint _dateOff, uint _dateEvent, string memory _urlImg)  public payable {
        require(msg.value >= calcFee(_price,_cantTokenMax),"No funds in the account");

        EventsArr[msg.sender].push(EventSt(_id,_name,_cantTokenMax,_price,_dateOff,_dateEvent,0,_urlImg));
        emit NewEvent(_id,_name,_cantTokenMax,_price,_dateOff,_dateEvent,_urlImg);
    }

    function getEvent() view  public returns(EventSt[] memory){
        return EventsArr[msg.sender];
    }

    function countEvent() view  public returns(uint){
        return EventsArr[msg.sender].length;
    }

    function getCountTiketsByEvent(address _EventOwner, uint _idEvt) view  public returns(uint){
        require(EventsArr[_EventOwner].length > 0,"Not have events");
        EventSt[] memory eventsCol = EventsArr[_EventOwner];

        for (uint j = 0; j < eventsCol.length; j++) {
           if (eventsCol[j].id == _idEvt){
                return eventsCol[j].contTikets;
           }
        }
       return 0;
    }
    
}