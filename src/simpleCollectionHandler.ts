import {ICollection, IOrder} from "./types/interfaces";
import {formatEther} from "ethers";

export async function simpleCollectionHandler(collection: ICollection,
                                              sellerAddress: string,
                                              tokenId: string,
                                              askPrice: number | string)
    : Promise<IOrder | undefined> {

    console.log({
        collection,
        sellerAddress,
        tokenId,
        askPrice: formatEther(String(askPrice)),
        price: String(collection?.lastPrice)
    })
}
