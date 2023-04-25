import {market} from "./market";
import {PancakeNftMarketContract} from "./contracts/pancakeNftMarket.contract";
import {orderHandler} from "../orderHandler";

async function main() {
    await market.updatePrices()
    await PancakeNftMarketContract.on('AskUpdate', orderHandler)
    await PancakeNftMarketContract.on('AskNew', orderHandler)

    orderHandler('0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07', '0x9f70cac38b07c517530528143b3278b7cd4f6159', '804445', '900000000000000000')
}

main();


