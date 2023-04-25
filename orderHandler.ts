import {market} from "./src/market";
import {otherIdCollectionHandler} from "./otherIdCollectionHandler";
import {simpleCollectionHandler} from "./simpleCollectionHandler";
import {IOrder} from "./src/types/interfaces";

export async function orderHandler(collectionAddress: string, sellerAddress: string, tokenId: string, askPrice: number) {
    const collection = market.getCollectionByAddress(collectionAddress);
    let otherId;
    if (!collection) return;
    if (collection.otherIds)
        otherId = await market.getTokenOtherIdByCollectionAndTokenId(collectionAddress, tokenId);


    let order: IOrder | undefined;

    if (otherId)
        order = await otherIdCollectionHandler(collection, sellerAddress, tokenId, askPrice, otherId);
    else
        order = await simpleCollectionHandler(collection, sellerAddress, tokenId, askPrice);
}
