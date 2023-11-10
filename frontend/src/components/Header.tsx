import { FC } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header: FC = () => {
  return (
    <header className="h-1/10">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-2xl text-indigo-500">CryptoTest NFT</div>
          <div className="">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
