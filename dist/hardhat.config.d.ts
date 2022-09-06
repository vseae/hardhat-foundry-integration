import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";
import "hardhat-tracer";
import "hardhat-storage-layout";
declare const config: HardhatUserConfig;
export default config;
