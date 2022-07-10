async function main() {
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
  console.log("events address:", events.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });