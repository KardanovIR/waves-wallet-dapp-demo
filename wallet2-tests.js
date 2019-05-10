const seedWithWaves = "create genesis wallet devnet-0"
const dappSeed = "dapp 1313159"
const userSeed = "user 1313159"
const dappAddress = address(dappSeed)
const userAddress = address(userSeed)

describe('Wallet test suite', () => {

    it('funds dapp account', async function(){
        console.log(dappAddress)
        const ttx = transfer({ amount: 1000000000, recipient: dappAddress }, seedWithWaves)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it('funds user account', async function(){
        const ttx = transfer({ amount: 1000000000, recipient: userAddress }, seedWithWaves)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it('deploys dapp script', async function(){
        const ttx = setScript({ script: compile(file("wallet2.ride"))}, dappSeed)
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    it('user deposits 3 waves', async function(){
        const ttx = invokeScript({
            dApp: dappAddress,
            call:{function:"deposit",args:[]}, 
            payment: [{amount: 300000000, asset:null }]},
            userSeed
            )
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })
    
    it('user deposits 2 waves', async function(){
        const ttx = invokeScript({
            dApp: dappAddress,
            call:{function:"deposit",args:[]}, 
            payment: [{amount: 200000000, asset:null }]},
            userSeed
            )
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })

    
    it('user withdraws 4 waves', async function(){
        const ttx = invokeScript({
            dApp: dappAddress,
            call:{function:"withdraw",args:[{type: "integer", value: 400000000}]}, 
            payment: []},
            userSeed
            )
        await broadcast(ttx)
        await waitForTx(ttx.id)
    })
})
