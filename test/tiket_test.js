

const { expect } = require("chai");
const { ethers } = require("hardhat");




before(async function () {
  const Tiket = await ethers.getContractFactory("Tiket");
  
  
  //const tikets = await Tiket.deploy();
  //console.log(owner);
});

describe("Tikets", function () {
  
  it("Should create a new tikets", async function () {
    const [owner] = await ethers.getSigners();
    
    const Event = await ethers.getContractFactory("contracts/Events.sol:Events");
    const events = await Event.deploy(); 
    
    await events.deployed();

    const Tikets = await ethers.getContractFactory("Tiket");
    
    const tikets = await Tikets.deploy(owner.address); 
    
    await tikets.deployed();
//{ value: ethers.utils.parseEther("0.5")}
    const ret =  await tikets.NewTiket(1);
    //console.log(ret)
    expect(ret.to.equal(1));
    
  });

 
});
