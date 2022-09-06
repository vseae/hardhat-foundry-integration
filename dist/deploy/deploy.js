"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("ethers/lib/utils");
const deploy = async function (hre) {
    const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;
    const currentTimestampInSeconds = 1439799168;
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
    const lockedAmount = (0, utils_1.parseEther)("0.000000001");
    await deploy("Lock", {
        from: deployer,
        args: [unlockTime],
        log: true,
        value: lockedAmount,
        deterministicDeployment: false,
    });
};
deploy.tags = ["Lock"];
exports.default = deploy;
