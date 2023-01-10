import { Connection, PublicKey } from "@solana/web3.js"
import { clusterApiUrl } from "@solana/web3.js"


export const getBalanceUsingWeb3 = async (address: PublicKey): Promise<number> => {
    const connection = new Connection(clusterApiUrl('devnet'))
    return connection.getBalance(address)
}
