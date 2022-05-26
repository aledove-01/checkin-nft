const { expect } = require("chai");
const { ethers } = require("hardhat");

before(async function () {
  const Tiket = await ethers.getContractFactory("Tiket");
  const [owner,addr1, addr2] = await ethers.getSigners();

  const tikets = await Tiket.deploy();
  //console.log(owner);
});

describe("Tikets", function () {
  
  it("Should return the new greeting once it's changed", async function () {
    const Tikets = await ethers.getContractFactory("Tiket");
    //const tikets = await Tikets.deploy(); 
    
    await tikets.deployed();

    const ret =  await tikets.NewTiket({ value: ethers.utils.parseEther("0.5") });
    console.log(ret)
    expect(ret.to.equal("Hello, world!"));
    
  });
});
