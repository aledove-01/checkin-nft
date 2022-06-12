async function main() {
    // We get the contract to deploy
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
    console.log("events address:", events.address);

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });