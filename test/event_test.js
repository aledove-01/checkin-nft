
const { expect } = require("chai");
const { ethers } = require("hardhat");

var Web3 = require('web3');
//console.log(Web3.version);

describe("Events utils", function () {
  let owner, ownerTkt, ownerEvt;
  
  it("Should return the calculated fee price (test)", async function () {
    const GenTiketURI = await ethers.getContractFactory("GenTiketURI");
    const genTiketURI = await GenTiketURI.deploy();
    [owner, ownerTkt,ownerTkt2, ownerEvt,ownerEvt2] = await ethers.getSigners();
    const Event = await ethers.getContractFactory("Events",{
      libraries:{
        "GenTiketURI": genTiketURI.address
      }
    });
    const events = await Event.deploy(owner.address); 
    
    await events.deployed();
 
    const ret =  await events.calcFee(parseInt(Web3.utils.fromWei('2000000000000000000','ether')), 1000); //0.2%
    console.log('ret: ',ethers.utils.formatEther(ret));
    expect(ethers.utils.formatEther(ret) == 4);
    
  });

  it("Should return the created new event", async function () {
    const GenTiketURI = await ethers.getContractFactory("GenTiketURI");
    const genTiketURI = await GenTiketURI.deploy();

    const Event = await ethers.getContractFactory("Events",{
      libraries:{
        "GenTiketURI": genTiketURI.address
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
    const _cantTokenMax = 1000;
    const _price = 1;
    const _urlImg = "http://urltest.com/img1.jpg";
    _dateEvent = _dateEvent.getTime();
    const ret =  await events.calcFee(_price,_cantTokenMax);
    console.log("fee to pay",ethers.utils.formatEther(ret.toString()));
    //const [owner] = await ethers.getSigners();

    //const ownerBalance = await events.balanceOf(owner.address);
    
    //console.log("Balance: ",ownerBalance);
    //console.log('FEE: ',ethers.utils.formatEther(ret,{pad:true}));
    

    await expect(
      await events.addEvent( _name, _line2, _dateSTring,_cantTokenMax, _price, _dateOff, _dateEvent, _urlImg,
        { value: ethers.utils.parseEther("10") }),
      )
      .to.emit(events, "NewEvent")
      .withArgs(_id,_name,_line2,_dateSTring,_cantTokenMax,_price,_dateOff,_dateEvent,_urlImg);
   
  });

 

  
});
describe("Events utils", function () {
  let owner, ownerTkt, ownerEvt;

  beforeEach(async function () {
    
    const GenTiketURI = await ethers.getContractFactory("GenTiketURI");
    const genTiketURI = await GenTiketURI.deploy();
    [owner, ownerTkt,ownerTkt2, ownerEvt,ownerEvt2] = await ethers.getSigners();
    const Event = await ethers.getContractFactory("Events",{
      libraries:{
        "GenTiketURI": genTiketURI.address
      }
    });
    this.events = await Event.deploy(owner.address); 
    //console.log(this.events);
  });

  it("Should new tiket same owner, and verify count tikets",async function(){
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
    const _cantTokenMax = 1000;
    const _price = 1;
    const _urlImg = "http://urltest.com/img1.jpg";

    var addr1Balance = await ownerEvt.getBalance();
    console.log('Balance init: ',ethers.utils.formatEther(addr1Balance.toString()));
    await this.events.connect(ownerEvt).addEvent( _name, _line2,_dateSTring,  _cantTokenMax, _price, _dateOff, _dateEvent, _urlImg,{ value: ethers.utils.parseEther("3") });
    await this.events.connect(ownerEvt).addEvent( _name, _line2,_dateSTring, _cantTokenMax, _price, _dateOff, _dateEvent, _urlImg,{ value: ethers.utils.parseEther("3") });
    
    addr1Balance = await ownerEvt.getBalance();
    console.log('Balance end:', ethers.utils.formatEther(addr1Balance.toString()));

    const cantEvt = await this.events.connect(ownerTkt).countEvent(ownerEvt.address);
    console.log("Cant. events:",cantEvt);

    //const structEvt = await this.events.connect(ownerTkt).getEventsByOwner(ownerEvt.address);
   //console.log(structEvt);

    await this.events.connect(ownerTkt).newTiket(ownerEvt.address,_id,{ value: ethers.utils.parseEther("3") });
    const idTiket = await this.events.connect(ownerTkt).getCounter();
    await this.events.connect(ownerTkt).newTiket(ownerEvt.address,_id,{ value: ethers.utils.parseEther("3") });
    const idTiket2 = await this.events.connect(ownerTkt).getCounter();

    console.log(idTiket2);
    console.log('idTiket: ',idTiket,' idTiket2: ',idTiket2);
    //const tokenURI = await this.events.connect(ownerTkt).tokenURI(idTiket);
    //console.log(tokenURI);

    await expect(ethers.utils.formatEther(idTiket.toString()) == 1);
   

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
    const _cantTokenMax = 1000;
    const _price = ethers.utils.parseEther("0.25"); //2500000000000000000; // 0.25 ethers - decimales 18
    const _urlImg = "http://urltest.com/img1.jpg";
    _dateEvent = _dateEvent.getTime();
   

    var addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 init create event: ',ethers.utils.formatEther(addr1Balance.toString()));
    await this.events.connect(ownerEvt).addEvent( _name, _line2 ,_dateSTring, _cantTokenMax, _price, _dateOff, _dateEvent, _urlImg,{ value: ethers.utils.parseEther("3") });
    await this.events.connect(ownerEvt).addEvent( _name, _line2 ,_dateSTring, _cantTokenMax, _price, _dateOff, _dateEvent, _urlImg,{ value: ethers.utils.parseEther("3") });
    
    addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 end create 2 events (-6):', ethers.utils.formatEther(addr1Balance.toString()));

    const cantEvt = await this.events.connect(ownerTkt).countEvent(ownerEvt.address);
    console.log("Cant. events:",cantEvt);

    //const structEvt = await this.events.connect(ownerTkt).getEventsByOwner(ownerEvt.address);
   //console.log(structEvt);
    let addr2BalanceA = await ownerTkt.getBalance();
    await this.events.connect(ownerTkt).newTiket(ownerEvt.address,_id,{ value: ethers.utils.parseEther("3") });
    let addr2BalanceB = await ownerTkt.getBalance();
    await this.events.connect(ownerTkt).newTiket(ownerEvt.address,_id,{ value: ethers.utils.parseEther("3") });
    let addr2BalanceC = await ownerTkt.getBalance();
    
    prov = ethers.getDefaultProvider();
    const addrBalanceContract = await prov.getBalance(this.events.address);

    console.log(ethers.utils.formatEther(addr2BalanceA.toString()),ethers.utils.formatEther(addr2BalanceB.toString()),ethers.utils.formatEther(addr2BalanceC.toString()));
    console.log(ethers.utils.formatEther(addrBalanceContract.toString()));
    
    await this.events.connect(ownerTkt).getCounter();
    await this.events.connect(ownerTkt2).newTiket(ownerEvt.address,_id,{ value: ethers.utils.parseEther("3") });
    await this.events.connect(ownerTkt).getCounter();
    const idTiket = await this.events.connect(ownerTkt).getCounter();
   
    const idTiketsOwner = await this.events.connect(ownerTkt).getByOwnerIdTikets(ownerTkt.address);
    console.log("idTiketsOwner: ",idTiketsOwner);
    addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 end post 3 tikets:', ethers.utils.formatEther(addr1Balance.toString()));


    const feesSum = await this.events.getFeesSum();
    console.log("feesSum: ",ethers.utils.formatEther(feesSum));
    const balanceOwnerContractInit = await owner.getBalance();
    await this.events.connect(owner).transferFees();
    const balanceOwnerContractEnd = await owner.getBalance();

    console.log(ethers.utils.formatEther(balanceOwnerContractInit.toString()),ethers.utils.formatEther(feesSum.toString()),ethers.utils.formatEther(balanceOwnerContractEnd.toString()));
    await expect(ethers.utils.formatEther(idTiket.toString()) == 3);
   

  })


  it("unitest complet 100 tikets",async function(){
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
    const _cantTokenMax = 100;
    const _price = ethers.utils.parseEther("0.25"); //2500000000000000000; // 0.25 ethers - decimales 18
    const _priceMoreGas = ethers.utils.parseEther("0.2509");
    const _priceMoreGasEvt = ethers.utils.parseEther("0.0645");
    const _urlImg = "http://urltest.com/img1.jpg";
    _dateEvent = _dateEvent.getTime();
   

    var addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 init create event: ',ethers.utils.formatEther(addr1Balance.toString()));
    await this.events.connect(ownerEvt).addEvent( _name, _line2 ,_dateSTring, _cantTokenMax, _price, _dateOff, _dateEvent, _urlImg,{ value: _priceMoreGasEvt});
    await this.events.connect(ownerEvt).addEvent( _name, _line2 ,_dateSTring, _cantTokenMax, _price, _dateOff, _dateEvent, _urlImg,{ value: _priceMoreGasEvt });
    
    addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 end create 2 events (-6):', ethers.utils.formatEther(addr1Balance.toString()));

    const cantEvt = await this.events.connect(ownerTkt).countEvent(ownerEvt.address);
    console.log("Cant. events:",cantEvt);


    addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 before sell tikets:', ethers.utils.formatEther(addr1Balance.toString()));
    for(i=0;i<_cantTokenMax;i++){
      await this.events.connect(ownerTkt).newTiket(ownerEvt.address,_id,{ value: _priceMoreGas});
    }
    addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 after sell tikets:', ethers.utils.formatEther(addr1Balance.toString()));

    const cantTikets = await this.events.connect(ownerTkt).getCounter();
   
    const idTiketsOwner = await this.events.connect(ownerTkt).getByOwnerIdTikets(ownerTkt.address);
    console.log("idTiketsOwner: ",idTiketsOwner.length);
    addr1Balance = await ownerEvt.getBalance();
    console.log('Balance owner1 end post 3 tikets:', ethers.utils.formatEther(addr1Balance.toString()));


    const feesSum = await this.events.getFeesSum();
    console.log("feesSum: ",ethers.utils.formatEther(feesSum));
    const balanceOwnerContractInit = await owner.getBalance();
    await this.events.connect(owner).transferFees();
    const balanceOwnerContractEnd = await owner.getBalance();

    console.log(ethers.utils.formatEther(balanceOwnerContractInit.toString()),ethers.utils.formatEther(feesSum.toString()),ethers.utils.formatEther(balanceOwnerContractEnd.toString()));
    await expect(ethers.utils.formatEther(cantTikets.toString()) == _cantTokenMax);
    console.log(cantTikets.toString());
    const tokenURI = await this.events.connect(ownerTkt).tokenURI(99);
    console.log(tokenURI);

  })
});
