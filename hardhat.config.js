/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-ethers');

const { MUMBAI_PRIVATE_KEY, MUMBAI_RPC_URL, MUMBAI_API_KEY } = process.env;
module.exports = {
  solidity: "0.8.20",
  networks: {
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: [MUMBAI_PRIVATE_KEY]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://polygonscan.com/
    apiKey: MUMBAI_API_KEY
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  }

};
