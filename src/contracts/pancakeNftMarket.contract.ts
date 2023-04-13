import {Contract} from "ethers";
import Abi from './pancakeNftMarket.abi.json'
import {provider} from "../providers";

export const PancakeNftMarketContract = new Contract('0x17539cCa21C7933Df5c980172d22659B8C345C5A', Abi, provider)
