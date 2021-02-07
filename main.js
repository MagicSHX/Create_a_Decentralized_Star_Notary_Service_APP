//var Web3 = require('web3');
//var url = 'https://rinkeby.infura.io/v3/fa33c78f73364ef482382b1140df0f2a';
//var url = 'HTTP:127.0.0.1:7545';
//let web3 = new Web3(url);
//consile.log(web3);
//console.log(web3);

//var address = '0x8E21D1CE02fD6Cec455Da473b9D969424bAa9678'
//0x81b7e08f65bdf5648606c89998a9cc8164397647
//var balance;
//web3.eth.getBalance(address, (err, bal) => { balance = bal });


//web3.utils.fromWei(balance, 'ether');
//console.log(balance);
//web3.eth.getTransactionCount(address [, defaultBlock] [, callback]);
//web3.eth.getTransactionCount("ACCOUNT NUMBER").then(console.log);

//var Web3 = require('web3')
//var url = 'HTTP://127.0.0.1:7545' // 8545 if using ganache-cli
//var web3 = new Web3(url)
//web3.eth.getAccounts().then(accounts => console.log(accounts));


/*##########################
CONFIGURATION

##########################*/

// -- Step 1: Set up the appropriate configuration 
var Web3 = require("web3") 
var EthereumTransaction = require("ethereumjs-tx").Transaction
var web3 = new Web3('HTTP://127.0.0.1:7545')

// -- Step 2: Set the sending and receiving addresses for the transaction. 
var sendingAddress = '0xb3692831cF93680aBD9083f80e6921F519C7e559' 
var receivingAddress = '0x4030d7B4Fa6AAd9b85D94eEF80082D8e6dE916CE'

// -- Step 3: Check the balances of each address 
web3.eth.getBalance(sendingAddress).then(console.log) 
web3.eth.getBalance(receivingAddress).then(console.log)

/*##########################
CREATE A TRANSACTION

##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown 
var rawTransaction = {
    nonce: 2, 
    to: receivingAddress, 
    gasPrice: 20000000, 
    gasLimit: 30000, 
    value: 1, 
    data: "0x"
}

// -- Step 5: View the raw transaction rawTransaction

// -- Step 6: Check the new account balances (they should be the same) 
web3.eth.getBalance(sendingAddress).then(console.log) 
web3.eth.getBalance(receivingAddress).then(console.log)

// Note: They haven't changed because they need to be signed...

/*##########################
Sign the Transaction

##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender 
var privateKeySender = 'd84d177da7bec07dd716f05f151285a235527c156968390baf805d59813e9364' 
var privateKeySenderHex = new Buffer(privateKeySender, 'hex') 
var transaction = new EthereumTransaction(rawTransaction) 
transaction.sign(privateKeySenderHex)

/*#########################################
Send the transaction to the network

#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network. 
var serializedTransaction = transaction.serialize(); 
web3.eth.sendSignedTransaction(serializedTransaction);

//web3.eth.getGasPrice([callback]).then(console.log)
//web3.eth.getBlockTransactionCount(blockHashOrBlockNumber [, callback]).then(console.log)