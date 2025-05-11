
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { DollarSign, Trophy } from 'lucide-react';

interface TopDonator {
  name: string;
  walletAddress: string;
  amount: number;
}

interface DonationPanelProps {
  streamId: string;
  creatorName: string;
  creatorWallet: string;
}

const DonationPanel = ({ streamId, creatorName, creatorWallet }: DonationPanelProps) => {
  const { connected, publicKey, solBalance } = useWallet();
  const [donationAmount, setDonationAmount] = useState<number>(1);
  const [donationMessage, setDonationMessage] = useState<string>('');
  const [topDonators, setTopDonators] = useState<TopDonator[]>([
    { name: 'sol_whale.sol', walletAddress: '3NymBFvEUULcnMJfxqaZ7WJq4ireB9xBj3X9vCaRoqye', amount: 5 },
    { name: 'defi_degen.sol', walletAddress: '9h2rWTYpRZBnTpFjfPTJT2WHPvUbps7vL4iJkrLrDCY4', amount: 2 },
    { name: 'crypto_king.sol', walletAddress: '8vKLpr3UY2QTLiPhQnb3eR3Qg7uyWWRZUfB6Xcbte6QZ', amount: 1 },
  ]);

  const presetAmounts = [0.5, 1, 2, 5, 10];

  const handleDonate = async () => {
    // In a real app, this would create and send a Solana transaction
    console.log(`Sending ${donationAmount} SOL to ${creatorWallet} with message: ${donationMessage}`);
    
    // Show success toast or message
    alert(`Donation of ${donationAmount} SOL sent successfully!`);
    
    // Reset form
    setDonationMessage('');
  };

  return (
    <div className="bg-secondary/50 rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-medium mb-4 flex items-center gap-1">
        <DollarSign size={18} className="text-solana" />
        Support {creatorName}
      </h3>
      
      {connected ? (
        <div>
          <div className="mb-4">
            <label className="text-white/70 text-sm block mb-1">Select Amount (SOL)</label>
            <div className="grid grid-cols-5 gap-2 mb-2">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  className={`py-1 rounded-md text-sm ${
                    donationAmount === amount
                      ? 'bg-solana text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                  onClick={() => setDonationAmount(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>
            <div className="text-right text-xs text-white/50">
              Your balance: {solBalance?.toFixed(2) || 0} SOL
            </div>
          </div>
          
          <div className="mb-4">
            <label className="text-white/70 text-sm block mb-1">Message (optional)</label>
            <textarea
              value={donationMessage}
              onChange={(e) => setDonationMessage(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-md text-white p-2 text-sm h-16 resize-none focus:ring-solana focus:border-solana"
              placeholder="Add a message with your donation"
            />
          </div>
          
          <Button 
            className="w-full bg-solana hover:bg-solana/90 text-white"
            onClick={handleDonate}
            disabled={!donationAmount || donationAmount <= 0 || (solBalance !== null && donationAmount > solBalance)}
          >
            Donate {donationAmount} SOL
          </Button>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-white/70 mb-3">Connect your wallet to support this creator</p>
          <Button className="bg-solana hover:bg-solana/90 text-white">
            Connect Wallet
          </Button>
        </div>
      )}
      
      {/* Top Donators */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <h4 className="text-white font-medium mb-3 flex items-center gap-1">
          <Trophy size={16} className="text-solana" />
          Top Supporters
        </h4>
        <div className="space-y-2">
          {topDonators.map((donor, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === 0 ? 'bg-yellow-500/20 text-yellow-500' : 
                  index === 1 ? 'bg-gray-400/20 text-gray-400' : 
                  'bg-amber-600/20 text-amber-600'
                }`}>
                  {index + 1}
                </div>
                <span className="text-white/90 text-sm">{donor.name}</span>
              </div>
              <span className="text-solana-foreground font-medium text-sm">
                {donor.amount} SOL
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationPanel;
