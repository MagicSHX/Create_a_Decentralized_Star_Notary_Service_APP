const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('can Create a Star', async() => {
    let tokenId = 1;
    let instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 3;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, {from: user2, value: balance});
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value2);
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance});
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance, gasPrice:0});
    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
    let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
    assert.equal(value, starPrice);
});

// Implement Task 2 Add supporting unit tests

it('can add the star name and star symbol properly', async() => {
    // 1. create a Star with different tokenId
    let tokenId = 6;
    let instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star 6!', tokenId, {from: accounts[0]});

    
    //console.log(await instance.tokenIdToStarInfo.call(tokenId));
    //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
    const name = await instance.name();
    const symbol = await instance.symbol();
    //console.log(name);
    assert.equal(name, "Star Notary Service Token");
    assert.equal(symbol, "SNST");
});

it('lets 2 users exchange stars', async() => {
    // 1. create 2 Stars with different tokenId
    let instance = await StarNotary.deployed();
    let user0 = accounts[0];
    let user1 = accounts[1];
    let starId_1 = 7;
    let starId_2 = 8;
    await instance.createStar('awesome star 7!', starId_1, {from: user0});
    await instance.createStar('awesome star 8!', starId_2, {from: user1});
    // 2. Call the exchangeStars functions implemented in the Smart Contract
    await instance.exchangeStars(starId_1, starId_2);
    // 3. Verify that the owners changed
    assert.equal(await instance.ownerOf.call(starId_1), user1);
    assert.equal(await instance.ownerOf.call(starId_2), user0);

});

it('lets a user transfer a star', async() => {
    // 1. create a Star with different tokenId
    let instance = await StarNotary.deployed();
    let user0 = accounts[0];
    let user1 = accounts[1];
    //console.log(user0);
    //console.log(user1);
    let starId = 9;
    await instance.createStar('awesome star 9!', starId, {from: user0});
    // 2. use the transferStar function implemented in the Smart Contract
    await instance.transferStar(user1, starId);
    // 3. Verify the star owner changed.
    assert.equal(await instance.ownerOf.call(starId), user1);
    //console.log(user1);
});

it('lookUptokenIdToStarInfo test', async() => {
    // 1. create a Star with different tokenId
    let tokenId = 10;
    let instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star 10!', tokenId, {from: accounts[0]});
    // 2. Call your method lookUptokenIdToStarInfo
    const star_name = await instance.lookUptokenIdToStarInfo(tokenId);
    // 3. Verify if you Star name is the same
    assert.equal(star_name, 'Awesome Star 10!');
});