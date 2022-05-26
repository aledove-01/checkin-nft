
const { expect } = require("chai");
const { ethers } = require("hardhat");

var Web3 = require('web3');
//console.log(Web3.version);

describe("Event", function () {
  
  it("Should return the calculated fee price (test)", async function () {
    const Event = await ethers.getContractFactory("Event");
    const events = await Event.deploy(); 
    
    await events.deployed();

   const ret =  await events.calcFee(parseInt(Web3.utils.fromWei('2000000000000000000','ether')), 1000); //0.1%
   // console.log(ret)
    //const FEE =    0.1;
    //const price = 10;
    //const cant =  1000;
   
    //const FeeDec = Web3.utils.fromWei(FEE.toString(),'ether');
   // console.log(FeeDec);
    //const calculo = Web3.utils.toWei("0.1","ether");
   // const calc = (price*cant*FEE/100);
  
    //console.log(Web3.utils.fromWei(calc.toString(),'ether'));
    console.log('ret: ',ethers.utils.formatEther(ret));
    expect(ethers.utils.formatEther(ret) == 4);
    
  });

  it("Should return the created new event", async function () {
    const Event = await ethers.getContractFactory("Event");
    const events = await Event.deploy(); 
    
    await events.deployed();
    const _id = 1;
    const _name = "test event 1";
    const _cantTokenMax = 1000;
    const _price = 10;
    const _dateOff = 16111111;
    const _dateEvent = 1630022;
    const _urlImg = "http://urltest.com/img1.jpg";

    const ret =  await events.calcFee(_price,_cantTokenMax);

    console.log('FEE: ',ret);
    await expect(
      events.addEvent(_id, _name , _cantTokenMax, _price, _dateOff, _dateEvent, _urlImg,
        { value: ethers.utils.parseEther("10") }),
      )
      .to.emit(events, "NewEvent")
      .withArgs(_id,_name,_cantTokenMax,_price,_dateOff,_dateEvent,_urlImg);
   
  });
});
