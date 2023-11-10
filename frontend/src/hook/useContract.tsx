import { Abi,  } from "viem";
import { read, write } from "./utils";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../config/config";

export function useContract() {
  const mint = async (
    wallet: string,
    value: bigint
  ) => {
    return await write({
      address: NFT_CONTRACT_ADDRESS as `0x${string}`,
      abi: NFT_CONTRACT_ABI as Abi,
      functionName: "mint",
      account: wallet as `0x${string}`,
      value: value
    });
  };

  const getTotalSupply = async () => {
    return await read({
      address: NFT_CONTRACT_ADDRESS as `0x${string}`,
      abi: NFT_CONTRACT_ABI as Abi,
      functionName: "totalSupply",
    })
  };

  const TOTAL_SUPPLY = async () => {
    return await read({
      address: NFT_CONTRACT_ADDRESS as `0x${string}`,
      abi: NFT_CONTRACT_ABI as Abi,
      functionName: "TOTAL_SUPPLY",
    })
  };

  const MINT_PRICE = async () => {
    return await read({
      address: NFT_CONTRACT_ADDRESS as `0x${string}`,
      abi: NFT_CONTRACT_ABI as Abi,
      functionName: "MINT_PRICE",
    })
  };

  return {
    mint,
    getTotalSupply,
    TOTAL_SUPPLY,
    MINT_PRICE
  };
}