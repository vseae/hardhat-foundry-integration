import { HttpNetworkUserConfig, HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";
import "hardhat-tracer";
import "hardhat-storage-layout";
import dotenv from "dotenv";
import yargs from "yargs";
import { userConfig } from "hardhat";
import { ProxyAgent, setGlobalDispatcher } from "undici";

// proxy
const proxyAgent: ProxyAgent = new ProxyAgent("http://127.0.0.1:7890");
setGlobalDispatcher(proxyAgent);

//load environment variables from .env file
dotenv.config();
const { NODE_URL, INFURA_KEY, MNEMONIC, ETHERSCAN_API_KEY, PK } = process.env;
const argv = yargs
  .option("network", {
    type: "string",
    default: "hardhat",
  })
  .help(false)
  .version(false).argv;
const DEFAULT_MNEMONIC =
  "chronic melody eager cool strike gate ordinary puppy merit beef insane exhaust";
const userNetworkConfig: HttpNetworkUserConfig = {};
if (PK) {
  userNetworkConfig.accounts = [PK];
} else {
  userNetworkConfig.accounts = {
    mnemonic: MNEMONIC || DEFAULT_MNEMONIC,
  };
}
if (
  ["mainnet", "rinkeby", "goerli"].includes(argv.network) &&
  INFURA_KEY === undefined
) {
  throw new Error(
    `Could not find Infura key in env, unable to connect to network ${argv.network}`
  );
}

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
  networks: {
    mainnet: {
      ...userNetworkConfig,
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    },
    rinkeby: {
      ...userNetworkConfig,
      url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
    },
    goerli: {
      ...userNetworkConfig,
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  abiExporter: {
    path: "./build/abi",
    runOnCompile: true,
    clear: true,
    flat: false,
    spacing: 2,
    format: "json",
  },
  mocha: {
    timeout: 20000000,
  },
};
if (NODE_URL) {
  userConfig.networks!.custom = {
    ...userNetworkConfig,
    url: NODE_URL,
  };
}
export default config;
