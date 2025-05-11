
import React, { createContext, useState, useEffect, useContext } from 'react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { authenticateWallet, logoutWalletSession, getWalletSession } from '@/services/walletAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type SolanaWalletProvider = {
  connect: () => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
  signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
  publicKey: PublicKey | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  connected: boolean;
};

interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
  solBalance: number | null;
  connectWallet: (walletName: string) => Promise<void>;
  disconnectWallet: () => void;
  wallets: { name: string; icon: string; provider: SolanaWalletProvider | null }[];
  currentWallet: string | null;
  isAuthenticated: boolean;
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  publicKey: null,
  solBalance: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  wallets: [],
  currentWallet: null,
  isAuthenticated: false,
});

export const useWallet = () => useContext(WalletContext);

declare global {
  interface Window {
    phantom?: {
      solana?: SolanaWalletProvider;
    };
    solflare?: SolanaWalletProvider;
    backpack?: SolanaWalletProvider;
  }
}

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [provider, setProvider] = useState<SolanaWalletProvider | null>(null);
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [currentWallet, setCurrentWallet] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const wallets = [
    {
      name: 'Phantom',
      icon: '/lovable-uploads/f1020bdc-4d93-41ef-b281-5c5aac6d080d.png',
      provider: window.phantom?.solana || null,
    },
    {
      name: 'Solflare',
      icon: '/lovable-uploads/63dfa36f-0f08-4d37-9c86-0ca888c5c7e0.png',
      provider: window.solflare || null,
    },
    {
      name: 'Backpack',
      icon: '/lovable-uploads/90a2f614-b08f-4729-8625-c22fcea043bd.png',
      provider: window.backpack || null,
    },
  ];

  // Check for existing wallet session on load
  useEffect(() => {
    const checkSession = async () => {
      const walletSession = getWalletSession();
      if (walletSession) {
        // Set session in Supabase
        await supabase.auth.setSession({
          access_token: walletSession.access_token,
          refresh_token: '',
        });
        setIsAuthenticated(true);
      }
    };
    
    checkSession();
  }, []);

  // Check for wallet providers and handle connections
  useEffect(() => {
    const checkForWallets = async () => {
      try {
        console.log("Checking for connected wallets...");
        
        // Check if already connected to any wallet
        for (const wallet of wallets) {
          const walletProvider = wallet.provider;
          
          if (walletProvider && walletProvider.connected) {
            setProvider(walletProvider);
            setConnected(true);
            setCurrentWallet(wallet.name);
            
            if (walletProvider.publicKey) {
              setPublicKey(walletProvider.publicKey.toString());
              fetchSolBalance(walletProvider.publicKey);
            }
            
            // Add event listeners
            walletProvider.on('connect', () => handleWalletConnect(walletProvider));
            walletProvider.on('disconnect', handleWalletDisconnect);
            
            console.log(`Connected to ${wallet.name}`);
            break;
          }
        }
      } catch (error) {
        console.error('Error checking for wallets:', error);
      }
    };
    
    checkForWallets();
    
    // Clean up event listeners on unmount
    return () => {
      if (provider) {
        provider.off('connect', () => handleWalletConnect(provider));
        provider.off('disconnect', handleWalletDisconnect);
      }
    };
  }, []);

  const handleWalletConnect = async (walletProvider: SolanaWalletProvider) => {
    if (walletProvider?.publicKey) {
      setConnected(true);
      setPublicKey(walletProvider.publicKey.toString());
      fetchSolBalance(walletProvider.publicKey);
    }
  };

  const handleWalletDisconnect = () => {
    setConnected(false);
    setPublicKey(null);
    setSolBalance(null);
    setCurrentWallet(null);
    setIsAuthenticated(false);
    logoutWalletSession();
  };

  const fetchSolBalance = async (walletAddress: PublicKey) => {
    try {
      const response = await fetch(
        `https://api.mainnet-beta.solana.com`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: [walletAddress.toString()],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const balanceInLamports = data.result.value;
      const balanceInSOL = balanceInLamports / 1000000000;
      setSolBalance(balanceInSOL);
    } catch (error) {
      console.error("Could not fetch SOL balance", error);
      setSolBalance(null);
    }
  };

  const connectWallet = async (walletName: string) => {
    try {
      // Find the wallet by name
      const selectedWallet = wallets.find(wallet => wallet.name === walletName);
      
      if (selectedWallet && selectedWallet.provider) {
        // Connect to the wallet
        const response = await selectedWallet.provider.connect();
        
        if (response && response.publicKey) {
          const walletPublicKey = response.publicKey;
          console.log(`Connected to ${walletName}!`, walletPublicKey.toString());
          
          // Update state
          setProvider(selectedWallet.provider);
          setConnected(true);
          setPublicKey(walletPublicKey.toString());
          setCurrentWallet(walletName);
          
          // Fetch SOL balance
          fetchSolBalance(walletPublicKey);
          
          // Set up event listeners
          selectedWallet.provider.on('connect', () => handleWalletConnect(selectedWallet.provider!));
          selectedWallet.provider.on('disconnect', handleWalletDisconnect);
          
          // Authenticate with Supabase
          if (selectedWallet.provider.signMessage) {
            const authenticated = await authenticateWallet(
              walletPublicKey,
              selectedWallet.provider.signMessage.bind(selectedWallet.provider)
            );
            
            setIsAuthenticated(authenticated);
          } else {
            toast.error("Wallet doesn't support message signing");
          }
        } else {
          console.error("Failed to get public key from wallet");
        }
      } else {
        console.log(`Wallet not available: ${walletName}`);
        toast.error("Wallet extension not detected", {
          description: "Please install the wallet extension first"
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error("Failed to connect wallet", {
        description: error instanceof Error ? error.message : "Unknown error"
      });
    }
  };

  const disconnectWallet = async () => {
    try {
      // First sign out from Supabase
      await logoutWalletSession();
      setIsAuthenticated(false);
      
      // Then disconnect the wallet
      if (provider) {
        await provider.disconnect();
        handleWalletDisconnect();
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast.error("Failed to disconnect wallet", {
        description: error instanceof Error ? error.message : "Unknown error"
      });
    }
  };

  const contextValue: WalletContextType = {
    connected,
    publicKey,
    solBalance,
    connectWallet,
    disconnectWallet,
    wallets,
    currentWallet,
    isAuthenticated,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
