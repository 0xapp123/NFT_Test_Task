import { Abi,  } from "viem";
import { read, write } from "./utils";
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "../config/config";

export function useMint() {
  const mint = async (
  ) => {
    return await write({
      address: NFT_CONTRACT_ADDRESS as `0x${string}`,
      abi: NFT_CONTRACT_ABI as Abi,
      functionName: "mint",
    });
  };

  const totalSupply = async () => {
    return await read({
      address: NFT_CONTRACT_ADDRESS as `0x${string}`,
      abi: NFT_CONTRACT_ABI as Abi,
      functionName: "totalSupply",
    })
  };

  return {
    mint,
    totalSupply
  };
}