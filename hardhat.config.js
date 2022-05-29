require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-web3");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
//test account region rail illegal yard mechanic bicycle roast club power evidence occur easy

//cuenta owner 0x0584CD0D2B4fBEC1741D5Da4174D8619c3fF69BC

//npx hardhat run scripts/sample-script.js --network rinkeby

//npx hardhat run --network rinkeby
//npx hardhat run scripts/sample-script.js --network rinkeby; 

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      gas: 3000000,
    }
  }
};
