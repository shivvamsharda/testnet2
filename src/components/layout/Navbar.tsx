
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { 
  LayoutDashboard, 
  Menu,
  X,
  Play,
  UserPlus,
  Wallet,
  Shield
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

const Navbar = () => {
  const { 
    connected, 
    connectWallet, 
    disconnectWallet, 
    publicKey, 
    solBalance, 
    wallets, 
    currentWallet,
    isAuthenticated
  } = useWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openWalletModal = () => setIsWalletModalOpen(true);
  const closeWalletModal = () => setIsWalletModalOpen(false);
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const formatPublicKey = (key: string | null) => {
    if (!key) return '';
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/70 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/58a2fd02-f723-4751-a545-69f9992adc15.png" 
              alt="SolStream Logo" 
              className="h-10 w-auto" 
            />
          </Link>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {connected ? (
              <div className="flex items-center gap-3">
                <div className="bg-secondary px-3 py-1.5 rounded-lg text-sm">
                  <span className="text-white/70 mr-1">Balance:</span>
                  <span className="text-solana-foreground font-medium">{solBalance?.toFixed(2)} SOL</span>
                </div>
                <div className="bg-secondary px-3 py-1.5 rounded-lg text-sm flex items-center">
                  <span className="text-white/70 mr-1">Wallet:</span>
                  <span className="text-solana font-medium">{formatPublicKey(publicKey)}</span>
                  {currentWallet && (
                    <span className="ml-1 text-white/50">({currentWallet})</span>
                  )}
                  {isAuthenticated && (
                    <Shield size={14} className="ml-2 text-green-400" />
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={disconnectWallet}
                  className="border-solana text-solana hover:bg-solana/10"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button 
                className="bg-solana hover:bg-solana/90 text-white" 
                onClick={openWalletModal}
              >
                <Wallet size={16} className="mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Centered Navigation */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-white/80 hover:text-white transition-colors flex items-center gap-1 font-medium">
            <LayoutDashboard size={18} />
            <span>Home</span>
          </Link>
          <Link to="/watch" className="text-white/80 hover:text-white transition-colors flex items-center gap-1 font-medium">
            <Play size={18} />
            <span>Watch</span>
          </Link>
          <Link to="/create" className="text-white/80 hover:text-white transition-colors flex items-center gap-1 font-medium">
            <UserPlus size={18} />
            <span>Become a Creator</span>
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-secondary border-t border-white/5 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col space-y-4 py-2">
            <Link 
              to="/" 
              className="text-white/80 hover:text-white transition-colors px-2 py-2 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/watch" 
              className="text-white/80 hover:text-white transition-colors px-2 py-2 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Play size={18} />
              <span>Watch</span>
            </Link>
            <Link 
              to="/create" 
              className="text-white/80 hover:text-white transition-colors px-2 py-2 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <UserPlus size={18} />
              <span>Become a Creator</span>
            </Link>
            <div className="border-t border-white/5 pt-2">
              {connected ? (
                <div className="space-y-2">
                  <div className="px-2 py-1">
                    <div className="text-sm text-white/70">Wallet</div>
                    <div className="font-medium text-solana flex items-center">
                      {formatPublicKey(publicKey)}
                      {currentWallet && (
                        <span className="ml-1 text-white/50">({currentWallet})</span>
                      )}
                      {isAuthenticated && (
                        <Shield size={14} className="ml-2 text-green-400" />
                      )}
                    </div>
                  </div>
                  <div className="px-2 py-1">
                    <div className="text-sm text-white/70">Balance</div>
                    <div className="font-medium text-solana-foreground">{solBalance?.toFixed(2)} SOL</div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-solana text-solana hover:bg-solana/10" 
                    onClick={disconnectWallet}
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button 
                  className="w-full bg-solana hover:bg-solana/90 text-white" 
                  onClick={openWalletModal}
                >
                  <Wallet size={16} className="mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Wallet Modal - Using Dialog component for proper centering */}
      <Dialog open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen}>
        <DialogContent className="bg-[#1A1F2C] border border-white/10 p-0 max-w-md w-full">
          <div className="p-6">
            <DialogHeader className="flex justify-between items-center mb-6">
              <DialogTitle className="text-xl font-bold text-white">Connect Wallet</DialogTitle>
              <DialogClose className="text-white/70 hover:text-white">
                <X size={20} />
              </DialogClose>
            </DialogHeader>
            
            <div className="space-y-3">
              {wallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => {
                    if (wallet.provider) {
                      connectWallet(wallet.name);
                      closeWalletModal();
                    }
                  }}
                  disabled={!wallet.provider}
                  className="w-full flex items-center gap-3 p-4 rounded-lg bg-black/30 hover:bg-black/50 transition-colors border border-white/5"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={wallet.icon} alt={wallet.name} className="w-10 h-10" />
                    </div>
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-white">{wallet.name}</div>
                    {wallet.provider ? (
                      <div className="text-xs text-green-400">Ready to connect</div>
                    ) : (
                      <div className="text-xs text-gray-500">Not installed</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
