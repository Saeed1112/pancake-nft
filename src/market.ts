// @ts-nocheck
import axios from 'axios'
import {ICollection, INft} from "./types/interfaces";
import {activeCollections} from "./consts";
import fs from "fs";
import {PancakeBunnyCollection} from "./contracts/panckeBunnyCollection.contract";

class Market {

    collections: ICollection[] = [];
    otherIds: any = {};

    constructor() {
        this.collections = activeCollections.filter(({isActive}) => isActive)
            .map(({otherIds, ...rest}) => ({
                ...rest,
                otherIds: otherIds && otherIds.filter(({isActive}) => isActive)
            }))

        this.otherIds['0xdf7952b35f24acf7fc0487d01c8d5690a60dba07'] = JSON.parse(fs.readFileSync('bunnyIds.json').toString())
    }

    async updatePrices() {
        return await Promise.all([
            this.updateCollections(),
            this.updateCollectionsWithOtherId()
        ])
    }

    async updateCollections() {
        return (await Promise.all(
            this.collections
                .filter(({otherIds}) => !otherIds)
                .map(({address}) => this.getPriceOfCollection(address))
        )).forEach((order) => {
            if (!order) return;
            const {currentAskPrice, currentSeller, collection} = order;
            const existCollection = this.collections.find(({address}) => address.toLowerCase() === collection?.id)
            if (!existCollection) return;
            existCollection.lastPrice = +currentAskPrice;
            existCollection.currentSeller = currentSeller.toLowerCase();
        })
    }

    async updateCollectionsWithOtherId() {
        return (await Promise.all(this.collections.filter(({otherIds, isActive}) => isActive && otherIds)
            .reduce((previousValue, currentValue) => ({
                ...previousValue,
                otherIds: [...previousValue, ...currentValue.otherIds]
            }))
            .otherIds.map(({id, collectionAddress}) => this.getPriceOfOtherId(collectionAddress, id))))
            .forEach((order) => {
                if (!order) return;
                const {currentAskPrice, currentSeller, collection, otherId} = order;
                const existCollection = this.collections.find(({address}) => address.toLowerCase() === collection?.id)
                if (!existCollection || !existCollection.otherIds) return;
                const existOtherIdNft = existCollection.otherIds.find(({id}) => id === otherId)
                if (!existOtherIdNft) return;
                existOtherIdNft.lastPrice = +currentAskPrice;
                existOtherIdNft.currentSeller = currentSeller;
            })
    }

    async getPriceOfCollection(collectionAddress: string): Promise<INft> {
        collectionAddress = collectionAddress.toLowerCase()
        const result = await axios.post('https://api.thegraph.com/subgraphs/name/pancakeswap/nft-market', {
            query: "query getNftsMarketData($first: Int, $skip: Int!, $where: NFT_filter, $orderBy: NFT_orderBy, $orderDirection: OrderDirection) {nfts(where: $where, first: $first, orderBy: $orderBy, orderDirection: $orderDirection, skip: $skip) {tokenId  currentAskPrice  currentSeller  latestTradedPriceInBNB  isTradable  updatedAt  otherId  collection {id} }}",
            variables: {
                where: {
                    collection: collectionAddress,
                    isTradable: true
                },
                first: 1,
                skip: 0,
                orderBy: "currentAskPrice",
                orderDirection: "asc"
            },
            operationName: "getNftsMarketData"
        })
        return result.data.data.nfts[0];
    }

    async getPriceOfOtherId(collectionAddress: string, otherId: string | number): Promise<INft> {
        const result = await axios.post('https://api.thegraph.com/subgraphs/name/pancakeswap/nft-market', {
            query: "query getNftsMarketData($first: Int, $skip: Int!, $where: NFT_filter, $orderBy: NFT_orderBy, $orderDirection: OrderDirection) {nfts(where: $where, first: $first, orderBy: $orderBy, orderDirection: $orderDirection, skip: $skip) {tokenId  currentAskPrice  currentSeller  latestTradedPriceInBNB  isTradable  updatedAt  otherId  collection {id} }}",
            variables: {
                where: {
                    otherId,
                    isTradable: true
                },
                first: 1,
                skip: 0,
                orderBy: "currentAskPrice",
                orderDirection: "asc"
            },
            operationName: "getNftsMarketData"
        })
        return result.data.data.nfts[0];
    }

    getCollectionByAddress(collectionAddress: string) {
        collectionAddress = collectionAddress.toLowerCase();
        return this.collections.find(({address}) => address.toLowerCase() === collectionAddress);
    }

    getCollectionByOtherIdAndCollection(collectionAddress: string, otherId: string | number) {
        collectionAddress = collectionAddress.toLowerCase();
        const collections = this.collections.find(({address}) => address.toLowerCase() === collectionAddress);
        if (!collections || !collections.otherIds) return;
        return collections.otherIds.find(({id}) => id === otherId);
    }

    async getTokenOtherIdByCollectionAndTokenId(collectionAddress: string, tokenId: string | number): Promise<string | number> {
        const collection = this.otherIds[collectionAddress.toLowerCase()];
        if (!collection) return;
        const otherId = collection[tokenId];
        if (otherId) return otherId;
        return (await PancakeBunnyCollection.getBunnyId(tokenId)).toString();
    }

}

export const market = new Market()



