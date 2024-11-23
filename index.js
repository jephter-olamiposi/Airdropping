const { 
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

// Generate a new keypair for the wallet
const wallet = new Keypair();

// Extract the public key from the keypair
const publicKey = new PublicKey(wallet._keypair.publicKey);

// Extract the secret key from the keypair
const secretKey = wallet._keypair.secretKey



// Function to get the wallet balance
const getWalletBalance = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const walletBalance = await connection.getBalance(publicKey);
        console.log(`Wallet Balance is ${walletBalance}`);
    } catch (err) {
        console.error(err);
    }
};

// Function to request an airdrop of SOL tokens
const airDropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const fromAirDropsignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirDropsignature);
        console.log(`Airdrop Successful`);
    } catch (err) {
        console.error(err);
    }
};

// Main function to execute the script
const main = async() => {
    console.log(`Your wallet address (public key) is: ${publicKey.toString()}`);
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance(); // Check balance again after airdrop
};

main();