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
//load environment variables from .env file
dotenv_1.default.config();
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
    abiExporter: {
        path: "./build/abi",
        runOnCompile: true,
        clear: true,
        flat: false,
        spacing: 2,
        format: "json",
    },
};
exports.default = config;
