import {market} from "./market";
import {PancakeNftMarketContract} from "./contracts/pancakeNftMarket.contract";
import {orderHandler} from "../orderHandler";

async function main() {
    await market.updatePrices()
    await PancakeNftMarketContract.on('AskUpdate', orderHandler)
    await PancakeNftMarketContract.on('AskNew', orderHandler)
}

main();


