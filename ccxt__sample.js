// var ccxt = require ('ccxt')

// console.log (ccxt.exchanges)


'use strict';
const ccxt = require ('ccxt');


const bitflyer = new ccxt.bitflyer ({config})

const interval = 30000;//30秒
const records = [];
const profitPrice = 500;
const orderSize = 0.01;

let oprderInfo = null;

const sleep = (timer)=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },timer)
    })
}
(async function () {
    const config = require('./config');
    while(true){
        const ticker = await bitflyer.fetchTicker('FX_BTC_JPY');
        records.push(ticker.ask)
        if(records.length > 3){
            records.shift()
        }
        console.log(records);
        if(oprderInfo){
            console.log('latetst bid price'+ticker.bid)
            console.log('order price' + orderInfo.price)
            console.log('diff'+ (ticker.bid - orderInfo.price))
            if(ticker.bid - orderInfo.price > profitPrice){
                const order =  await bitflyer.createMarketSellOrder ('BTC/JPY', orderSize)
                orderInfo = null
                console.log('利確しました',order)
            }else if(ticker.bid - orderInfo.price < -profitPrice){
                const order =  await bitflyer.createMarketSellOrder ('BTC/JPY', orderSize)
                orderInfo = null
                console.log('ロスカットしました',order)
            }
        }else{
            if(records[0]<records[1] && records[1]<records[2]){
                const order =  await bitflyer.createMarketSellOrder ('BTC/JPY', orderSize)
                orderInfo={
                    order:order,
                    price:ticker.ask
                }
                console.log('買い注文しました！',orderInfo)
            }
        }
        

        await sleep(interval);
}
    // console.log (bitflyer.id,    await bitflyer.loadMarkets ())


    // console.log (bitflyer.id,  await bitflyer.fetchOrderBook (bitflyer.symbols[0]))

    // console.log (bitflyer.id, await bitflyer.fetchBalance ())

    // // sell 1 BTC/USD for market price, sell a bitcoin for dollars immediately
    

    // // buy 1 BTC/USD for $2500, you pay $2500 and receive ฿1 when the order is closed
    // console.log (bitflyer.id, await bitflyer.createLimitBuyOrder ('BTC/JPY', 1, 2500.00))

    // // pass/redefine custom exchange-specific order params: type, amount, price or whatever
    // // use a custom order type
    // bitflyer.createLimitSellOrder ('BTC/JPY', 1, 10, { 'type': 'trailing-stop' })

}) ();