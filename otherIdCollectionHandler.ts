import {ICollection, IOrder} from "./src/types/interfaces";
import {market} from "./src/market";
import {formatEther} from "ethers";

export async function otherIdCollectionHandler(collection: ICollection, sellerAddress: string, tokenId: string, askPrice: number | string, otherId: number | string): Promise<IOrder | undefined> {

    askPrice = formatEther(askPrice)
    sellerAddress = sellerAddress.toLowerCase();
    const otherItem = market.getCollectionByOtherIdAndCollection(collection.address, otherId);
    console.log(otherItem, askPrice)

}
