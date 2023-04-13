import {market} from "./market";


async function main() {

    await market.updatePrices()
    console.log(market.collections[market.collections.length - 1])

    // console.log(await market.getPriceOfOtherId(10))

    // console.log(await market.updateCollectionsWithOtherId())


}


main();
