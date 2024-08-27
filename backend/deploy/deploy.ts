import { Deployer } from "@matterlabs/hardhat-zksync";
import { vars } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-ethers";

export default async function (hre: HardhatRuntimeEnvironment) {
    console.log(`Running deploy script`);

    // Initialize the wallet using your private key.
    const wallet = new Wallet(vars.get("DEPLOYER_PRIVATE_KEY"));

    const deployer = new Deployer(hre, wallet);
    // Deploy HelloAbstract
    const helloArtifact = await deployer.loadArtifact("HelloAbstract");
    const helloContract = await deployer.deploy(helloArtifact);
    console.log(
        `${helloArtifact.contractName} was deployed to ${await helloContract.getAddress()}`
    );

    // Deploy DecentralTune
    const decentralTuneArtifact = await deployer.loadArtifact("DecentralTune");
    const decentralTuneContract = await deployer.deploy(decentralTuneArtifact);
    console.log(
        `${decentralTuneArtifact.contractName} was deployed to ${await decentralTuneContract.getAddress()}`
    );
}
