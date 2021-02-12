var Web3 = require("web3") 
//var EthereumTransaction = require("ethereumjs-tx").Transaction
var web3 = new Web3('HTTP://127.0.0.1:7545')
web3.eth.getTransactionCount("0xb3692831cF93680aBD9083f80e6921F519C7e559").then(console.log);