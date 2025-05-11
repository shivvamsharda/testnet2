
import React, { useState, useRef, useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, DollarSign, Send, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  walletAddress?: string;
  isDonation?: boolean;
  donationAmount?: number;
}

interface ChatBoxProps {
  streamId: string;
}

const ChatBox = ({ streamId }: ChatBoxProps) => {
  const { connected, publicKey } = useWallet();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Mock data - in a real app, this would come from a WebSocket
  useEffect(() => {
    const demoMessages: ChatMessage[] = [
      {
        id: '1',
        sender: 'cosmic.sol',
        walletAddress: '8xjCHNYT1rKqr37PmPqr2uPsk9RZL9Ksvh7kVk7q8Y7U',
        message: 'Great stream today!',
        timestamp: new Date(Date.now() - 60000),
      },
      {
        id: '2',
        sender: 'moon.sol',
        walletAddress: '7FwQS9gwfwdy58SbJ1eyPUVaTNTbcf5JY9QhZXKf9waX',
        message: 'Thanks for the tips on Solana NFTs',
        timestamp: new Date(Date.now() - 50000),
      },
      {
        id: '3',
        sender: 'sol_lover.sol',
        walletAddress: '6X2GkvkrB9fS5N6cxdTYP2PYL7JCRQhxccoiXgZ1Tddt',
        message: '🔥 🔥 🔥',
        timestamp: new Date(Date.now() - 40000),
      },
      {
        id: '4',
        sender: 'defi_degen.sol',
        walletAddress: '9h2rWTYpRZBnTpFjfPTJT2WHPvUbps7vL4iJkrLrDCY4',
        message: 'When are you covering Raydium?',
        timestamp: new Date(Date.now() - 30000),
        isDonation: true,
        donationAmount: 0.5,
      },
      {
        id: '5',
        sender: 'sol_whale.sol',
        walletAddress: '3NymBFvEUULcnMJfxqaZ7WJq4ireB9xBj3X9vCaRoqye',
        message: 'Keep up the good content!',
        timestamp: new Date(Date.now() - 20000),
        isDonation: true,
        donationAmount: 2,
      },
    ];
    
    setMessages(demoMessages);
  }, [streamId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !connected) return;
    
    // Add message to chat (would normally send to WebSocket)
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: publicKey ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}.sol` : 'anonymous',
      message: message.trim(),
      timestamp: new Date(),
      walletAddress: publicKey || undefined,
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-secondary/50 rounded-lg border border-white/10">
      <div className="p-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <MessageCircle size={18} className="text-solana" />
          <h3 className="text-white font-medium">Stream Chat</h3>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="animate-fade-in">
            {msg.isDonation ? (
              <div className="bg-solana/20 p-2 rounded-lg">
                <div className="flex items-center gap-1.5">
                  <DollarSign size={14} className="text-solana-foreground" />
                  <span className="text-solana-foreground font-medium text-xs">
                    {msg.donationAmount} SOL Donation
                  </span>
                </div>
                <div className="flex items-start gap-1 mt-1">
                  <div className="bg-white/10 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User size={12} className="text-white" />
                  </div>
                  <div>
                    <span className="text-solana font-medium text-xs">{msg.sender}</span>
                    <p className="text-white text-sm mt-0.5">{msg.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-1.5">
                <div className="bg-white/10 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User size={12} className="text-white" />
                </div>
                <div>
                  <span className="text-solana font-medium text-xs">{msg.sender}</span>
                  <p className="text-white/90 text-sm">{msg.message}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      
      {connected ? (
        <form onSubmit={handleSubmit} className="p-3 border-t border-white/10">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-black/30 border-white/10 focus:ring-solana focus:border-solana text-white"
            />
            <Button 
              type="submit" 
              className="bg-solana hover:bg-solana/90 text-white flex-shrink-0"
              disabled={!message.trim()}
            >
              <Send size={16} />
            </Button>
          </div>
        </form>
      ) : (
        <div className="p-3 border-t border-white/10">
          <Button className="w-full bg-solana hover:bg-solana/90 text-white">
            Connect Wallet to Chat
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
