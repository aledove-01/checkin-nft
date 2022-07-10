
const { expect } = require("chai");
const { ethers } = require("hardhat");

var Web3 = require('web3');
//console.log(Web3.version);

describe("Events utils", function () {
  let owner, ownerTkt, ownerEvt;
  
  it("Should return the calculated fee price (test)", async function () {
    const BarcodeBase64 = await ethers.getContractFactory("BarcodeBase64");
    const barcodeBase64 = await BarcodeBase64.deploy();

    const GenTicketURI = await ethers.getContractFactory("GenTicketURI",{
      libraries:{
        "BarcodeBase64": barcodeBase64.address
      }
    });
    const genTicketURI = await GenTicketURI.deploy();
    [owner, ownerTkt,ownerTkt2, ownerEvt,ownerEvt2] = await ethers.getSigners();
    const Event = await ethers.getContractFactory("Events",{
      libraries:{
        "GenTicketURI": genTicketURI.address
      }
    });
    const events = await Event.deploy(owner.address); 
    
    await events.deployed();
 
    const ret =  await events.calcFee(parseInt(Web3.utils.fromWei('2000000000000000000','ether')), 1000); //0.2%
    console.log('ret: ',ethers.utils.formatEther(ret));
    expect(ethers.utils.formatEther(ret) == 5);
    
  });

  it("Should return the created new event", async function () {
    const BarcodeBase64 = await ethers.getContractFactory("BarcodeBase64");
    const barcodeBase64 = await BarcodeBase64.deploy();

    const GenTicketURI = await ethers.getContractFactory("GenTicketURI",{
      libraries:{
        "BarcodeBase64": barcodeBase64.address
      }
    });
    const genTicketURI = await GenTicketURI.deploy();

    const Event = await ethers.getContractFactory("Events",{
      libraries:{
        "GenTicketURI": genTicketURI.address,
      }
    });
    const events = await Event.deploy(owner.address); 
    await events.deployed();
    
    var _dateOff = new Date();    
    _dateOff.setDate(_dateOff.getDate() + 30);
    _dateOff = _dateOff.getTime();
    //date 45 days more than now in timespan date event
    var _dateEvent = new Date();
    _dateEvent.setDate(_dateEvent.getDate() + 45);
    
     
    const _id = 1;
    const _name = "Crypto ETH LAS VEGAS 2023";
    const _line2 = "Las vegas - Nevada - street 4456 first floor";
    const _dateSTring = _dateEvent.getFullYear() + '/' + _dateEvent.getMonth() + '/' + _dateEvent.getDate() + ' ' + _dateEvent.getHours() + ':' + _dateEvent.getMinutes();
    const _cantTicketsMax = 1000;
    const _price = 1;
    const _urlImg = "http://urltest.com/img1.jpg";
    const _freeEvent = false;
    const _paused = false;
    _dateEvent = _dateEvent.getTime();
    const ret =  await events.calcFee(_price,_cantTicketsMax);
    console.log("fee to pay",ethers.utils.formatEther(ret.toString()));
    //const [owner] = await ethers.getSigners();

    //const ownerBalance = await events.balanceOf(owner.address);
    
    //console.log("Balance: ",ownerBalance);
    //console.log('FEE: ',ethers.utils.formatEther(ret,{pad:true}));
    const gasEstimate = ethers.gasEstimate(events.addEvent(_name, _line2, _dateSTring,_cantTicketsMax, _price, _dateOff, _dateEvent, _urlImg,false,false));
   // const gasEstimate = await events.addEvent(_name, _line2, _dateSTring,_cantTicketsMax, _price, _dateOff, _dateEvent, _urlImg,false,false).gasEstimate();
    console.log('------- gasEstimate: ',gasEstimate);


    await expect(
      await events.addEvent( _name, _line2, _dateSTring,_cantTicketsMax, _price, _dateOff, _dateEvent, _urlImg,false,false,
        { value: ethers.utils.parseEther("10") }),
      )
      .to.emit(events, "NewEvent")
      .withArgs(_id,_name,_line2,_dateSTring,_cantTicketsMax,_price,_dateOff,_dateEvent,_urlImg,_freeEvent, _paused);
   
  });

 

  
});
describe("Events utils", function () {
  let owner, ownerTkt, ownerEvt;

  beforeEach(async function () {
    const BarcodeBase64 = await ethers.getContractFactory("BarcodeBase64");
    const barcodeBase64 = await BarcodeBase64.deploy();

    const GenTicketURI = await ethers.getContractFactory("GenTicketURI",{
      libraries:{
        "BarcodeBase64": barcodeBase64.address
      }
    });
    const genTicketURI = await GenTicketURI.deploy();
    [owner, ownerTkt,ownerTkt2, ownerEvt,ownerEvt2] = await ethers.getSigners();
    const Event = await ethers.getContractFactory("Events",{
      libraries:{
        "GenTicketURI": genTicketURI.address,
      }
    });
    this.events = await Event.deploy(owner.address); 
    //console.log(this.events);
  });

  it("Should new ticket same owner, and verify count tickets",async function(){
    //date 30 days more than now in timespan date off sell
    var _dateOff = new Date();    
    _dateOff.setDate(_dateOff.getDate() + 30);
    _dateOff = _dateOff.getTime();
    //date 45 days more than now in timespan date event
    var _dateEvent = new Date();
    _dateEvent.setDate(_dateEvent.getDate() + 45);
    

    const _id = 1;
    const _name = "Crypto ETH LAS VEGAS 2023";
    const _line2 = "Las vegas - Nevada - street 4456 first floor";
    const _dateSTring = _dateEvent.getFullYear() + '/' + _dateEvent.getMonth() + '/' + _dateEvent.getDate() + ' ' + _dateEvent.getHours() + ':' + _dateEvent.getMinutes();
    _dateEvent = _dateEvent.getTime();
    const _cantTicketsMax = 1000;
    const _price = 1;
    const _urlImg = "http://urltest.com/img1.jpghttp://urltest.com/img1.jpg";

    var addr1Balance = await ownerEvt.getBalance();
    console.log('Balance init: ',ethers.utils.formatEther(addr1Balance.toString()));
    await this.events.connect(ownerEvt).addEvent( _name, _line2,_dateSTring,  _cantTicketsMax, _price, _dateOff, _dateEvent, _urlImg,false,false,{ value: ethers.utils.parseEther("3") });
    await this.events.connect(ownerEvt).addEvent( _name, _line2,_dateSTring, _cantTicketsMax, _price, _dateOff, _dateEvent, _urlImg,false,false,{ value: ethers.utils.parseEther("3") });
    
    addr1Balance = await ownerEvt.getBalance();
    console.log('Balance end:', ethers.utils.formatEther(addr1Balance.toString()));

    const cantEvt = await this.events.connect(ownerTkt).countEvent(ownerEvt.address);
    console.log("Cant. events:",cantEvt);

    //const structEvt = await this.events.connect(ownerTkt).getEventsByOwner(ownerEvt.address);
   //console.log(structEvt);

    await this.events.connect(ownerTkt).newTicket(ownerEvt.address,_id,{ value: ethers.utils.parseEther("3") });
    const idTicket = await this.events.connect(ownerTkt).getCounter();
    await this.events.connect(ownerTkt).newTicket(ownerEvt.address,_id,{ value: ethers.utils.parseEther("3") });
    const idTicket2 = await this.events.connect(ownerTkt).getCounter();

    console.log(idTicket2);
    console.log('idTicket: ',idTicket,' idTicket2: ',idTicket2);
    //const tokenURI = await this.events.connect(ownerTkt).tokenURI(idTicket);
    //console.log(tokenURI);

    await expect(ethers.utils.formatEther(idTicket.toString()) == 1);
   
   
  })

  it("unitest complet",async function(){
    var _dateOff = new Date();    
    _dateOff.setDate(_dateOff.getDate() + 30);
    _dateOff = _dateOff.getTime();
    //date 45 days more than now in timespan date event
    var _dateEvent = new Date();
    _dateEvent.setDate(_dateEvent.getDate() + 45);

    const _id = 1;
    const _name = "Crypto ETH LAS VEGAS 2023";
    const _line2 = "Las vegas - Nevada - street 4456 first floor";
    const _dateSTring = _dateEvent.getFullYear() + '/' + _dateEvent.getMonth() + '/' + _dateEvent.getDate() + ' ' + _dateEvent.getHours() + ':' + _dateEvent.getMinutes();
    const _cantTicketsMax = 1000;
    const _price = ethers.utils.parseEther("0.25"); //2500000000000000000; // 0.25 ethers - decimales 18
    const _urlImg = "http://urltest.com/img1.jpg";
    _dateEvent = _dateEvent.getTime();
   

    var addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 init create event: ',ethers.utils.formatEther(addr1Balance.toString()));
    await this.events.connect(ownerEvt).addEvent( _name, _line2 ,_dateSTring, _cantTicketsMax, _price, _dateOff, _dateEvent, _urlImg,false,false,{ value: ethers.utils.parseEther("3") });
    await this.events.connect(ownerEvt).addEvent( _name, _line2 ,_dateSTring, _cantTicketsMax, _price, _dateOff, _dateEvent, _urlImg,false,false,{ value: ethers.utils.parseEther("3") });
    
    addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 end create 2 events (-6):', ethers.utils.formatEther(addr1Balance.toString()));

    const cantEvt = await this.events.connect(ownerTkt).countEvent(ownerEvt.address);
    console.log("Cant. events:",cantEvt);

    //const structEvt = await this.events.connect(ownerTkt).getEventsByOwner(ownerEvt.address);
   //console.log(structEvt);
    let addr2BalanceA = await ownerTkt.getBalance();
    await this.events.connect(ownerTkt).newTicket(ownerEvt.address,_id,{ value: ethers.utils.parseEther("3") });
    let addr2BalanceB = await ownerTkt.getBalance();
    await this.events.connect(ownerTkt).newTicket(ownerEvt.address,_id,{ value: ethers.utils.parseEther("3") });
    let addr2BalanceC = await ownerTkt.getBalance();
    
    prov = ethers.getDefaultProvider();
    const addrBalanceContract = await prov.getBalance(this.events.address);

    console.log(ethers.utils.formatEther(addr2BalanceA.toString()),ethers.utils.formatEther(addr2BalanceB.toString()),ethers.utils.formatEther(addr2BalanceC.toString()));
    console.log(ethers.utils.formatEther(addrBalanceContract.toString()));
    
    await this.events.connect(ownerTkt).getCounter();
    await this.events.connect(ownerTkt2).newTicket(ownerEvt.address,_id,{ value: ethers.utils.parseEther("3") });
    await this.events.connect(ownerTkt).getCounter();
    const idTicket = await this.events.connect(ownerTkt).getCounter();
   
    const idTicketsOwner = await this.events.connect(ownerTkt).getByOwnerIdTickets(ownerTkt.address);
    console.log("idTicketsOwner: ",idTicketsOwner);
    addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 end post 3 tickets:', ethers.utils.formatEther(addr1Balance.toString()));


    const feesSum = await this.events.getFeesSum();
    console.log("feesSum: ",ethers.utils.formatEther(feesSum));
    const balanceOwnerContractInit = await owner.getBalance();
    await this.events.connect(owner).transferFees();
    const balanceOwnerContractEnd = await owner.getBalance();

    console.log(ethers.utils.formatEther(balanceOwnerContractInit.toString()),ethers.utils.formatEther(feesSum.toString()),ethers.utils.formatEther(balanceOwnerContractEnd.toString()));
    await expect(ethers.utils.formatEther(idTicket.toString()) == 3);
   

  })


  it("unitest complet 100 tickets",async function(){
    var _dateOff = new Date();    
    _dateOff.setDate(_dateOff.getDate() + 30);
    _dateOff = _dateOff.getTime();
    //date 45 days more than now in timespan date event
    var _dateEvent = new Date();
    _dateEvent.setDate(_dateEvent.getDate() + 45);

    const _id = 1;
    const _name = "Crypto ETH LAS VEGAS 2023";
    const _line2 = "Las vegas - Nevada - street 4456 first floor";
    const _dateSTring = _dateEvent.getFullYear() + '/' + _dateEvent.getMonth() + '/' + _dateEvent.getDate() + ' ' + _dateEvent.getHours() + ':' + _dateEvent.getMinutes();
    const _cantTicketsMax = 100;
    const _price = ethers.utils.parseEther("0.25"); //2500000000000000000; // 0.25 ethers - decimales 18
    const _priceMoreGas = ethers.utils.parseEther("0.2509");
    const _priceMoreGasEvt = ethers.utils.parseEther("0.0645");
    const _urlImg = "http://urltest.com/img1.jpg";
    _dateEvent = _dateEvent.getTime();
   

    var addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 init create event: ',ethers.utils.formatEther(addr1Balance.toString()));
    await this.events.connect(ownerEvt).addEvent( _name, _line2 ,_dateSTring, _cantTicketsMax, _price, _dateOff, _dateEvent, _urlImg,false,false,{ value: _priceMoreGasEvt});
    await this.events.connect(ownerEvt).addEvent( _name, _line2 ,_dateSTring, _cantTicketsMax, _price, _dateOff, _dateEvent, _urlImg,false,false,{ value: _priceMoreGasEvt });
    
    addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 end create 2 events (-6):', ethers.utils.formatEther(addr1Balance.toString()));

    const cantEvt = await this.events.getEventsCount();
    console.log("Cant. events:",cantEvt);


    addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 before sell tickets:', ethers.utils.formatEther(addr1Balance.toString()));
    for(i=0;i<_cantTicketsMax;i++){
      await this.events.connect(ownerTkt).newTicket(ownerEvt.address,_id,{ value: _priceMoreGas});
    }
    addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 after sell tickets:', ethers.utils.formatEther(addr1Balance.toString()));

    const cantTickets = await this.events.connect(ownerTkt).getCounter();
   
    const idTicketsOwner = await this.events.connect(ownerTkt).getByOwnerIdTickets(ownerTkt.address);
    console.log("idTicketsOwner: ",idTicketsOwner.length);
    addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 end post 3 tickets:', ethers.utils.formatEther(addr1Balance.toString()));


    const feesSum = await this.events.getFeesSum();
    console.log("feesSum: ",ethers.utils.formatEther(feesSum));
    const balanceOwnerContractInit = await owner.getBalance();
    await this.events.connect(owner).transferFees();
    const balanceOwnerContractEnd = await owner.getBalance();

    console.log(ethers.utils.formatEther(balanceOwnerContractInit.toString()),ethers.utils.formatEther(feesSum.toString()),ethers.utils.formatEther(balanceOwnerContractEnd.toString()));
    await expect(ethers.utils.formatEther(cantTickets.toString()) == _cantTicketsMax);
    console.log(cantTickets.toString());
    const tokenURI = await this.events.connect(ownerTkt).tokenURI(99);
    console.log(tokenURI);
    await this.events.connect(ownerEvt).setPausedEvent(_id,true);

    const evtDesc1 = await this.events.connect(ownerEvt).getEventById(ownerEvt.address,_id);
    console.log("event 1 desc: ________________________",ownerEvt.address);
    console.log(evtDesc1)
  })
});
