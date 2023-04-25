import {ICollection, IOrder} from "./src/types/interfaces";
import {market} from "./src/market";

export async function otherIdCollectionHandler(collection: ICollection, sellerAddress: string, tokenId: string, askPrice: number, otherId: number | string): Promise<IOrder |  undefined> {

    const otherItem = market.getCollectionByOtherIdAndCollection(collection.address, otherId);
    console.log(otherItem)

}
