import {market} from "./src/market";
import {otherIdCollectionHandler} from "./otherIdCollectionHandler";
import {simpleCollectionHandler} from "./simpleCollectionHandler";

export async function orderHandler(collectionAddress: string, sellerAddress: string, tokenId: string, askPrice: number) {
    const collection = market.getCollectionByAddress(collectionAddress);
    let otherId;
    if (!collection) return;
    if (collection.otherIds)
        otherId = await market.getTokenOtherIdByCollectionAndTokenId(collectionAddress, tokenId);


    let order = null;

    if (otherId)
        await otherIdCollectionHandler(collection, sellerAddress, tokenId, askPrice, otherId);
    else
        await simpleCollectionHandler(collection, sellerAddress, tokenId, askPrice);

}
