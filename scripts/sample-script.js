// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  /*const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);*/

  const Event = await ethers.getContractFactory("contracts/Events.sol:Events");
  const events = await Event.deploy(); 
  
  await events.deployed();

  const ret1 =  await events.calcFee(parseInt(Web3.utils.fromWei('2000000000000000000','ether')), 1000); //0.1%
  console.log(ret1);


  const Tikets = await ethers.getContractFactory("Tiket");
  const [owner] = await ethers.getSigners();
  const tikets = await Tikets.deploy(owner.address); 
  
  await tikets.deployed();
//{ value: ethers.utils.parseEther("0.5")}
  const ret =  await tikets.NewTiket(1);
  //console.log(ret)
  console.log(ret);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
