export interface ICollection {
    name: string,
    totalSupply: string,
    symbol: string,
    address: string,
    isActive: boolean,
    updated?: boolean,
    lastPrice?: number,
    currentSeller?: string,
    minProfit: number,
    maxPrice: number,
    profitPercentage: number,
    otherIds?: OtherId[]
    id?: string
}

export interface OtherId {
    minProfit: number,
    profitPercentage: number,
    lastPrice: number,
    currentSeller?: string,
    maxPrice: number,
    id: number | string,
    isActive: boolean,
    name: string,
    collectionAddress: string
}


export interface Nft {
    tokenId: string;
    currentAskPrice: string;
    currentSeller: string;
    latestTradedPriceInBNB: string;
    isTradable: boolean;
    updatedAt: string;
    otherId: null;
    collection: ICollection;
}


