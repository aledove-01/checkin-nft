// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./CheckInNFTV1.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./GenTicketURI.sol";

contract Events is CheckInNFTV1{
    using Strings for string;
    using GenTicketURI for string;
    using Address for address payable;

    event NewEvent(uint id, string name, string line2, string dateStr, uint cantTicketsMax, 
                    uint price, uint dateOff, uint dateEvent, string urlImg, bool freeEvent, bool paused);
    event NewTicket(uint idEvt, address owner, uint idTicket);
   

    bool private prevReentrant = false;
    uint private feesSum;
    address payable private OWNER_ACCOUNT; 
    uint64 private FEE;
    uint64 private FEE_FREE;
    bool private pausedContract;

    //agregar pausa eventos, pausa tickets

    mapping (uint256 => address) private _EventOwnerMap;
    mapping (address => EventSt[]) private _eventsMap;
    mapping (uint256 => uint256) private _ticketEventMap;
    mapping (address => uint256[]) private _ownerTicketsMap;
    uint256 private _eventsCount;

    struct EventSt{
        uint id;
        string namEvt;
        string line2;
        string dateStr;
        uint cantTicketsMax;
        uint price;
        uint dateOff;
        uint dateEvent;
        uint contTickets; //counter minted tickets
        string urlImg;
        bool freeEvent;
        bool paused;
    }

    constructor(address payable _owner){
        OWNER_ACCOUNT = _owner;
        _eventsCount = 0;
        FEE = 25; //porcent 0.25%
        feesSum = 0;
        FEE_FREE = 0.25 ether;
    }
  
  //onlyOwner
    function setPausedContract(bool _paused) public onlyOwner{ 
        pausedContract = _paused;
    }

//publics
    function getEventsCount() public view returns(uint256){
        return _eventsCount;
    }
    function calcFee(uint256 _price, uint _cantTicketsMax) view public returns (uint256){
        //return (((_price*1 wei)*_cantTicketsMax*FEE)/10000)* (1 ether);
        return (((_price)*1 wei) * _cantTicketsMax * FEE /10000); //cal porc
    }

    function addEvent(string memory _name, string memory _line2,string memory _dateStr, uint _cantTicketsMax, 
                        uint _price, uint _dateOff, 
                        uint _dateEvent, string memory _urlImg, bool _freeEvent, bool _paused)  public payable {
        uint FeeFree = _freeEvent ? FEE_FREE : calcFee(_price, _cantTicketsMax);
        require(_cantTicketsMax > 0, "cantTicketsMax must be greater than 0");
        require(msg.value >= FeeFree,"Not founds");
        feesSum += FeeFree;
        _eventsCount += 1;
        _EventOwnerMap[_eventsCount] = msg.sender;
        _eventsMap[msg.sender].push(EventSt(_eventsCount,_name,_line2,_dateStr,_cantTicketsMax,_price,_dateOff,_dateEvent,0,_urlImg,_freeEvent,_paused));
        emit NewEvent(_eventsCount,_name,_line2,_dateStr,_cantTicketsMax,_price,_dateOff,_dateEvent,_urlImg,_freeEvent,_paused);
    }

    function getByOwnerIdTickets(address _owner) view public returns (uint256[] memory){
        return _ownerTicketsMap[_owner];
    }
    function getEventsByOwner(address ownerEvent) public view returns(EventSt[] memory){
        return _eventsMap[ownerEvent];
    }

    function countEvent(address ownerEvent) public view  returns(uint){
        return _eventsMap[ownerEvent].length;
    }

    function getEventById(address _EventOwner, uint _idEvt) view public returns(EventSt memory){
        require(_eventsMap[_EventOwner].length > 0 && getEventsByOwner(_EventOwner)[_idEvt-1].id != 0,"Owner has no events");
        return getEventsByOwner(_EventOwner)[_idEvt-1];
    }
  
    function setPausedEvent(uint _idEvt, bool _paused) public {
        require(_eventsMap[msg.sender].length > 0 && getEventsByOwner(msg.sender)[_idEvt-1].id != 0,"Owner has no events");
        _eventsMap[msg.sender][_idEvt-1].paused = _paused;
    }

    function newTicket(address payable _EventOwner,uint256 _idEvt) payable public {
        Events.EventSt memory eventSt = _eventsMap[_EventOwner][_idEvt-1];
        require(_eventsMap[_EventOwner][_idEvt-1].id !=0,"Event not exist");
        if (!eventSt.freeEvent){
            require(msg.value >= eventSt.price + calcFee(eventSt.price,1),"Not founds");
        }
        require(eventSt.contTickets <= eventSt.cantTicketsMax,"Soldout");
        require(eventSt.dateOff >= block.timestamp,"Event sell is end");
        require(eventSt.dateEvent >= block.timestamp,"Event is end");
        require(!eventSt.paused,"Event is paused");
        require(!prevReentrant, "Reentrant call detected!");
        prevReentrant = true;
        (bool success, ) = _EventOwner.call{value:eventSt.price * (1 wei)-calcFee(eventSt.price,1)}('');
        require(success, "Transfer failed.");  
        prevReentrant = false;
        feesSum += calcFee(eventSt.price,1);
        _eventsMap[_EventOwner][_idEvt-1].contTickets += 1;
        uint256 idTicket = super.mint(msg.sender);
        _ticketEventMap[idTicket] = _idEvt;  
        _ownerTicketsMap[msg.sender].push(idTicket);  
        emit NewTicket(_idEvt,msg.sender,idTicket);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        address ownerTicket = super.ownerOf(_tokenId);
        uint256 idEvent = _ticketEventMap[_tokenId];
        address addressOwnerEvent = _EventOwnerMap[idEvent];

        EventSt memory eventS = getEventById(addressOwnerEvent,idEvent);
        return  GenTicketURI.genUri(GenTicketURI.SVGParams(eventS.namEvt,eventS.line2, eventS.dateStr, ownerTicket, _tokenId));
       
    }
    function transferFees() public{
        require(OWNER_ACCOUNT == msg.sender);
        (bool success,) = OWNER_ACCOUNT.call{value:feesSum}('');
        require(success, "Transfer failed.");
        feesSum = 0;
    }

    function getFeesSum() public view returns(uint256){
        return feesSum;
    }

     modifier onlyOwner(){
        require(msg.sender == OWNER_ACCOUNT);
        _;
    }
}