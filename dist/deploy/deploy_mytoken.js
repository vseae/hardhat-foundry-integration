"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deploy = async function (hre) {
    const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;
    await deploy("MyToken", {
        from: deployer,
        args: [],
        log: true,
        deterministicDeployment: false,
    });
};
deploy.tags = ["MyToken"];
exports.default = deploy;
