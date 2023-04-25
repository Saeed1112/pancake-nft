import {ICollection} from "./src/types/interfaces";
import {formatEther} from "ethers";

export async function otherIdCollectionHandler(collection: ICollection, sellerAddress: string, tokenId: string, askPrice: number, otherId: number | string) {
    console.log('Other id', {
        collection,
        sellerAddress,
        tokenId,
        askPrice,
        otherId,
        price: formatEther(String(collection?.lastPrice))
    })
}
