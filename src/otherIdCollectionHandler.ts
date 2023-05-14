import {ICollection, IOrder} from "./types/interfaces";
import {market} from "./market";
import {formatEther} from "ethers";

export async function otherIdCollectionHandler(collection: ICollection, sellerAddress: string, tokenId: string, askPrice: number | string, otherId: number | string): Promise<IOrder | undefined> {

    const steps = [];
    const _askPrice = askPrice
    askPrice = Number.parseFloat(formatEther(String(askPrice)))
    sellerAddress = sellerAddress.toLowerCase();
    const otherItem = market.getCollectionByOtherIdAndCollection(collection.address, otherId);
    if (!otherItem) return;

    const profitPercentage = 100 - (askPrice / otherItem?.lastPrice * 100);
    steps[0] = askPrice <= +otherItem?.maxPrice;
    steps[1] = profitPercentage >= otherItem?.profitPercentage;
    const isAcceptable = steps.reduce((a, b) => a && b)
    console.log({isAcceptable, profitPercentage, askPrice, otherItem, steps})

    if (!isAcceptable) return;


    return {askPrice: _askPrice, tokenId, collection, otherItem}

}
