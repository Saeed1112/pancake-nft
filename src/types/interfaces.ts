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
    otherIds?: IOtherItem[]
    id?: string
}

export interface IOtherItem {
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


export interface INft {
    tokenId: string;
    currentAskPrice: string;
    currentSeller: string;
    isTradable: boolean;
    updatedAt: string;
    otherId: null;
    collection: ICollection;
}

export interface IOrder {
    askPrice: number | string;
    tokenId: string | number;
    collection: ICollection;
    otherItem?: IOtherItem
}
