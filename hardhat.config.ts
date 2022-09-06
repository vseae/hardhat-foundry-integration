import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";
import "hardhat-tracer";
import "hardhat-storage-layout";
import dotenv from "dotenv";

//load environment variables from .env file
dotenv.config();
// hardhat config
const config: HardhatUserConfig = {
  paths: {
    artifacts: "build/artifacts",
    cache: "build/cache",
    tests: "test",
    deploy: "deploy",
    sources: "contracts",
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    },
  },
  abiExporter: {
    path: "./build/abi",
    runOnCompile: true,
    clear: true,
    flat: false,
    spacing: 2,
    format: "json",
  },
};

export default config;
