import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { formatEther, parseEther } from "viem";

import { useContract } from "../hook/useContract";

import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAccount } from "wagmi";

function App() {
  const [loading, setLoading] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);
  const [supply, setSupply] = useState(0);
  const [mintPrice, setMintPrice] = useState(0);

  const { isConnected, address } = useAccount();
  const { mint, getTotalSupply, TOTAL_SUPPLY, MINT_PRICE } = useContract();

  const handleMint = async () => {
    setLoading(true);
    try {
      if (address) {
        const res = await mint(
          address as `0x${string}`,
          BigInt(parseEther(mintPrice.toString()))
        );

        if (res) {
          console.log(res);
          setLoading(false);
          if (res.status === "success") {
            toast.success("Success!", {
              autoClose: 3000, // Close the toast after 3 seconds
            });
          } else {
            toast.error("Reverted!", {
              autoClose: 3000, // Close the toast after 3 seconds
            });
          }
        }
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast.error("Mint function Reverted!", {
        autoClose: 3000, // Close the toast after 3 seconds
      });
    }
  };

  const getData = () => {
    let interval = setInterval(async () => {
      getGlobalInfo();
    }, 3000);
    return interval;
  };

  const getGlobalInfo = async () => {
    const mintedInfo = await getTotalSupply();
    const totalAmountInfo = await TOTAL_SUPPLY();
    const mintPriceInfo = await MINT_PRICE();

    console.log("mintedInfo:", mintedInfo);
    console.log("totalAmountInfo:", totalAmountInfo);
    console.log("mintPriceInfo:", mintPriceInfo);

    if (mintedInfo) {
      // @ts-ignore
      setSupply(Number(mintedInfo));
    }
    if (totalAmountInfo) {
      // @ts-ignore
      setTotalSupply(Number(totalAmountInfo));
    }
    if (mintPriceInfo) {
      // @ts-ignore
      setMintPrice(Number(formatEther(mintPriceInfo)));
    }
  };

  useEffect(() => {
    let interval = getData();
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="fixed w-full">
        <div className="block max-w-[1200px] h-screen mx-auto mt-6">
          <div className="block m-auto">
            <div className="text-4xl font-bold m-6 text-center">
              CryptoTest NFT Minting
            </div>
            <div className="flex justify-center font-semibold my-2 text-green-900">
              <span className="mr-6">Total Items : {totalSupply}</span>
              <span>Price: {mintPrice} MATIC</span>
            </div>
          </div>

          <img
            className="w-[calc(25vw)] block m-auto"
            src="/collection.gif"
          ></img>

          <div className="my-6 font-medium text-xl text-center">
            Minted: {supply}/{totalSupply}
          </div>

          {isConnected &&
            (supply < totalSupply ? (
              <div className="block m-auto w-1/4">
                <button
                  className=" mt-3 p-2 w-full bg-green-500 font-bold text-white rounded-[8px]"
                  onClick={handleMint}
                >
                  Mint
                </button>
                {loading && <LoadingSpinner />}
              </div>
            ) : (
              <div className="block m-auto w-1/4">
                <button
                  className=" mt-3 p-2 w-full bg-gray-600 font-bold text-white rounded-[8px]"
                  onClick={handleMint}
                  disabled
                >
                  Mint is Finished
                </button>
                {loading && <LoadingSpinner />}
              </div>
            ))}
        </div>
      </main>
    </>
  );
}

export default App;
