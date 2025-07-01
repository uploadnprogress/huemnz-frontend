import { StandaloneModal } from '@web3modal/standalone';

// -- Web3Modal Configuration --
const modalConfig = {
  // UPDATED with your Project ID
  projectId: "1b0fbca95f47c62990525a4221e35d88", 
  
  // This tells Web3Modal to work with the Polkadot ecosystem
  chains: ["polkadot:91b171bb158e2d3848fa23a9f1c25182"], // Polkadot Mainnet Chain ID
  
  // These settings improve the user experience
  enableExplorer: true,
  explorerRecommendedWalletIds: [
    'c57ca95b47569778a828d191785f2ce554c28d88487112510a77809628135882', // Polkadot.js
    '5ddb2afb84e273d34477435548679fd6454173360585150534327618688463c6', // Talisman
    '38a59c31c2c375806614da29a876797a78017df9381e855799a74de55a6669f3', // SubWallet
    // 'Nova Wallet' and other mobile wallets will appear automatically via QR code
  ]
};

export const web3Modal = new StandaloneModal(modalConfig);