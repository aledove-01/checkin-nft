import '../artifacts/contracts/Tiket.sol';

async function load(){
    
    const web3 = new Web3(window.ethereum);
    

    let account = undefined;
    //await CheckNetwork();
    try {
        account = await web3.eth.requestAccounts();
    } catch (error) {
        
    }
    //console.log(account);

    const idRed =  await web3.eth.net.getId();
    
    if (!idRed || idRed != 4){//rinkeby
        console.log("Connect to RINKEBY.");
        document.getElementById("container").style.display = "none";
        alert('connect RINKEBY'); 
        return 0;
    }
    
    document.getElementById("wallet").innerHTML = account[0];
}

async function  CheckNetwork(){
    const chainId = 4 // Polygon Mainnet

    if (ethereum.networkVersion !== chainId) {
        try {
            await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: web3.utils.toHex(chainId) }]
            });
        } catch (err) {
            // This error code indicates that the chain has not been added to MetaMask
            if (err.code === 4902) {
            await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                {
                    chainName: 'Rinkeby',
                    chainId: web3.utils.toHex(chainId),
                    nativeCurrency: { name: 'Rinkeby', decimals: 18, symbol: 'RIN' },
                    rpcUrls: ['https://rinkeby.infura.io/v3/3ce8ac87affd44bf983f96208363653d']
                }
                ]
            });
            }
        }
    }
}

function test1(e){
    alert('click');
}