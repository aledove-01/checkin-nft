/*const { tiketContractAddress } = require('./conf_test_on_chain.js')
const fs = require('fs');
const abiContract = JSON.parse(fs.readFileSync('./artifacts/contracts/Tiket.sol/Tiket.json', 'utf-8'))


async function getTokenCounter() {
    const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc")
    const contract = new ethers.Contract(butterflyToken, ButterflyToken.abi, provider)
    const tokenCounter = await contract.tokenCounter()
    return tokenCounter
  }
  
  async function mintToken(ipfsUrl) {
    const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc")
    const signer = new ethers.Wallet("0xYOUR_PRIVATE_KEY", provider);
    const contract = new ethers.Contract(butterflyToken, ButterflyToken.abi, signer)
    const transaction = await contract.mint(ipfsUrl)
    await transaction.wait()
    const tokenCounter = await contract.tokenCounter()
    return `${tokenCounter - 1}`
  }*/