import {ICollection, IOrder} from "./types/interfaces";
import {formatEther} from "ethers";

export async function simpleCollectionHandler(collection: ICollection,
                                              sellerAddress: string,
                                              tokenId: string,
                                              askPrice: number | string)
    : Promise<IOrder | undefined> {

    const steps = [];
    const _askPrice = askPrice
    askPrice = Number.parseFloat(formatEther(String(askPrice)))
    sellerAddress = sellerAddress.toLowerCase();
    const profitPercentage = 100 - (askPrice / collection?.lastPrice * 100);

    steps[0] = askPrice <= +collection?.maxPrice;
    steps[1] = profitPercentage >= collection?.profitPercentage;
    const isAcceptable = steps.reduce((a, b) => a && b)
    console.log({isAcceptable, profitPercentage, askPrice, collection, steps})

    if (!isAcceptable) return;


    return {askPrice: _askPrice, tokenId, collection}
}
