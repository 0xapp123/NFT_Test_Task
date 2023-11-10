import Header from "../components/Header";

import { useState } from "react";

import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

function App() {

  const [loading, setLoading] =  useState(false);


  const handleMint = async () => {
    setLoading(true);
    try {
      const res = await mint();

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
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
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
              <span className="mr-6">Total Items : 10</span>
              <span>Price: 0.02 MATIC</span>
            </div>
          </div>

          <img
            className="w-[calc(25vw)] block m-auto"
            src="/collection.gif"
          ></img>

          <div className="my-6 font-medium text-xl text-center">
            Minted: 2/10
          </div>

          <div className="block m-auto w-1/4">
            <button
              className=" mt-3 p-2 w-full bg-green-500 font-bold text-white rounded-[8px]"
              onClick={handleMint}
            >
              Mint
            </button>
            {loading && <LoadingSpinner />}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
