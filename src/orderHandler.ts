import {market} from "./market";
import {otherIdCollectionHandler} from "./otherIdCollectionHandler";
import {simpleCollectionHandler} from "./simpleCollectionHandler";
import {IOrder} from "./types/interfaces";

export async function orderHandler(collectionAddress: string, sellerAddress: string, tokenId: string, askPrice: number | string) {
    if (!market.updated) return;
    const collection = market.getCollectionByAddress(collectionAddress);
    market
        .updatePrices()
        .then(() => console.log('Updated Market in background'))
    let otherId;
    if (!collection) return;
    if (collection.otherIds)
        otherId = await market.getTokenOtherIdByCollectionAndTokenId(collectionAddress, tokenId);
    let order: IOrder | undefined;
    if (otherId)
        order = await otherIdCollectionHandler(collection, sellerAddress, tokenId, askPrice, otherId);
    else
        order = await simpleCollectionHandler(collection, sellerAddress, tokenId, askPrice);
    if (order)
        console.log({order})

}
