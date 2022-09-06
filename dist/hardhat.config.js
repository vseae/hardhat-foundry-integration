"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("hardhat-deploy");
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-contract-sizer");
require("hardhat-abi-exporter");
require("hardhat-tracer");
require("hardhat-storage-layout");
const dotenv_1 = __importDefault(require("dotenv"));
const yargs_1 = __importDefault(require("yargs"));
const undici_1 = require("undici");
require("./scripts/tasks/deploy_verify");
// proxy
const proxyAgent = new undici_1.ProxyAgent("http://127.0.0.1:7890");
(0, undici_1.setGlobalDispatcher)(proxyAgent);
//load environment variables from .env file
dotenv_1.default.config();
const { NODE_URL, INFURA_KEY, MNEMONIC, ETHERSCAN_API_KEY } = process.env;
const PK = process.env.PK?.split(",");
const argv = yargs_1.default
    .option("network", {
    type: "string",
    default: "hardhat",
})
    .help(false)
    .version(false).argv;
const DEFAULT_MNEMONIC = "chronic melody eager cool strike gate ordinary puppy merit beef insane exhaust";
const userNetworkConfig = {};
if (PK) {
    userNetworkConfig.accounts = PK;
}
else {
    userNetworkConfig.accounts = {
        mnemonic: MNEMONIC || DEFAULT_MNEMONIC,
    };
}
if (["mainnet", "rinkeby", "goerli"].includes(argv.network) &&
    INFURA_KEY === undefined) {
    throw new Error(`Could not find Infura key in env, unable to connect to network ${argv.network}`);
}
// hardhat config
const config = {
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
        hardhat: {
            chainId: 31337,
            blockGasLimit: 100000000,
            gas: 100000000,
        },
        mainnet: {
            ...userNetworkConfig,
            chainId: 1,
            url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
        },
        rinkeby: {
            ...userNetworkConfig,
            chainId: 4,
            url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
        },
        goerli: {
            ...userNetworkConfig,
            chainId: 5,
            url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
        },
    },
    namedAccounts: {
        deployer: 0,
        bob: 1,
        alice: 2,
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
    config.networks.custom = {
        ...userNetworkConfig,
        url: NODE_URL,
    };
}
exports.default = config;
