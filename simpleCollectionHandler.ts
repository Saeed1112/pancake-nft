import {ICollection, IOrder} from "./src/types/interfaces";
import {formatEther} from "ethers";

export async function simpleCollectionHandler(collection: ICollection, sellerAddress: string, tokenId: string, askPrice: number): Promise<IOrder |  undefined> {
    console.log({
        collection,
        sellerAddress,
        tokenId,
        askPrice,
        price: formatEther(String(collection?.lastPrice))
    })
}
