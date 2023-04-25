import {Contract} from "ethers";
import {provider} from "../providers";

export const PancakeBunnyCollection = new Contract('0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07', [
    {
        "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
        "name": "getBunnyId",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    }
], provider)
