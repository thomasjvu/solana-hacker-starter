import React, { FC, useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  CloverWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import styled from 'styled-components';
import { theme } from '../../theme';

// Import wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const CustomWalletButton = styled(WalletMultiButton)`
  background-color: ${theme.colors.terminalGreen} !important;
  border-radius: ${theme.sizes.borderRadius} !important;
  transition: all ${theme.transitions.default} !important;
  
  &:hover {
    background-color: ${theme.colors.terminalGreenDark} !important;
  }
  
  .wallet-adapter-button-start-icon {
    margin-right: 0.5rem !important;
  }
`;

const WalletDisplay = styled.div`
  border: 1px solid ${theme.colors.terminalGreen};
  border-radius: ${theme.sizes.borderRadius};
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background-color: rgba(0, 255, 65, 0.1);
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const WalletConnectionProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;
  
  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking
  // For optimal bundle size, specify only the wallets you intend to support
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new CloverWalletAdapter(),
    ],
    [network]
  );
  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const WalletConnect: FC = () => {
  const { publicKey } = useWallet();
  
  const truncatedAddress = useMemo(() => {
    if (!publicKey) return '';
    const address = publicKey.toString();
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }, [publicKey]);
  
  return (
    <WalletSection>
      {publicKey && (
        <WalletDisplay>
          {truncatedAddress}
        </WalletDisplay>
      )}
      <CustomWalletButton />
    </WalletSection>
  );
};

export default WalletConnect; 