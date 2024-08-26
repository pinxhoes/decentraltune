import { ethers } from "ethers";
import { Provider, Wallet } from "zksync-ethers";

export async function createWallet(): Promise<Wallet> {
    const provider = new Provider(process.env.NEXT_PUBLIC_ABSTRACT_RPC_URL!);
    const randomWallet = ethers.Wallet.createRandom();
    return new Wallet(randomWallet.privateKey, provider);
}