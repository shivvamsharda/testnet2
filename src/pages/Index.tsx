import React from 'react';
import Layout from '../components/layout/Layout';
import StreamCard from '../components/stream/StreamCard';
import { Link } from 'react-router-dom';
import { Video, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data
const featuredStreams = [
  {
    id: '1',
    title: 'NFT Minting Strategy for Q3 2024',
    creator: {
      id: '101',
      name: 'crypto_sage.sol',
      avatar: 'https://placehold.co/100x100/8B5CF6/FFFFFF?text=CS'
    },
    thumbnail: 'https://placehold.co/800x450/222/666?text=NFT+Minting+Stream',
    viewerCount: 1243,
    isLive: true,
    category: 'NFTs'
  },
  {
    id: '2',
    title: 'DeFi on Solana: Advanced Yield Farming',
    creator: {
      id: '102',
      name: 'defi_wizard.sol',
      avatar: 'https://placehold.co/100x100/14F195/FFFFFF?text=DW'
    },
    thumbnail: 'https://placehold.co/800x450/222/666?text=DeFi+Stream',
    viewerCount: 852,
    isLive: true,
    category: 'DeFi'
  },
  {
    id: '3',
    title: 'Trading SOL - Technical Analysis & Price Predictions',
    creator: {
      id: '103',
      name: 'sol_trader.sol',
      avatar: 'https://placehold.co/100x100/00C2FF/FFFFFF?text=ST'
    },
    thumbnail: 'https://placehold.co/800x450/222/666?text=Trading+Stream',
    viewerCount: 723,
    isLive: true,
    category: 'Trading'
  },
  {
    id: '4',
    title: 'Solana DApp Development Workshop',
    creator: {
      id: '104',
      name: 'sol_dev.sol',
      avatar: 'https://placehold.co/100x100/9945FF/FFFFFF?text=SD'
    },
    thumbnail: 'https://placehold.co/800x450/222/666?text=Dev+Workshop',
    viewerCount: 456,
    isLive: false,
    category: 'Development'
  }
];

const popularStreams = [
  {
    id: '5',
    title: 'Building a Solana NFT Marketplace from Scratch',
    creator: {
      id: '105',
      name: 'web3_builder.sol',
      avatar: 'https://placehold.co/100x100/FF6B6B/FFFFFF?text=WB'
    },
    thumbnail: 'https://placehold.co/800x450/222/666?text=NFT+Marketplace',
    viewerCount: 387,
    isLive: true,
    category: 'Development'
  },
  {
    id: '6',
    title: 'Solana Gaming: Play to Earn Projects Review',
    creator: {
      id: '106',
      name: 'crypto_gamer.sol',
      avatar: 'https://placehold.co/100x100/FFD166/FFFFFF?text=CG'
    },
    thumbnail: 'https://placehold.co/800x450/222/666?text=Gaming+Stream',
    viewerCount: 291,
    isLive: true,
    category: 'Gaming'
  },
  {
    id: '7',
    title: 'Solana Ecosystem Projects to Watch in 2024',
    creator: {
      id: '107',
      name: 'sol_investor.sol',
      avatar: 'https://placehold.co/100x100/06D6A0/FFFFFF?text=SI'
    },
    thumbnail: 'https://placehold.co/800x450/222/666?text=Ecosystem+Projects',
    viewerCount: 432,
    isLive: false,
    category: 'Investment'
  },
  {
    id: '8',
    title: 'Solana Wallet Security Best Practices',
    creator: {
      id: '108',
      name: 'crypto_security.sol',
      avatar: 'https://placehold.co/100x100/118AB2/FFFFFF?text=CS'
    },
    thumbnail: 'https://placehold.co/800x450/222/666?text=Wallet+Security',
    viewerCount: 278,
    isLive: true,
    category: 'Security'
  }
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-solana/20 to-solana-secondary/20"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Stream, Connect & Earn with <span className="solana-gradient bg-clip-text text-transparent">Solana</span>
            </h1>
            <p className="text-white/70 text-lg mb-8">
              The first streaming platform exclusively for Solana users and creators.
              Stream your content, engage with viewers, and earn SOL donations directly to your wallet.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/watch">
                <Button size="lg" className="bg-solana hover:bg-solana/90 text-white">
                  Start Watching
                </Button>
              </Link>
              <Link to="/create">
                <Button size="lg" variant="outline" className="border-solana text-solana hover:bg-solana/10">
                  Become a Creator
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#1A1F2C] to-transparent"></div>
      </section>
      
      {/* Featured Streams */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Video size={24} className="text-solana" />
              <h2 className="text-xl font-bold text-white">Featured Streams</h2>
            </div>
            <Link to="/streams" className="text-solana hover:underline text-sm">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStreams.map((stream) => (
              <StreamCard key={stream.id} {...stream} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Categories */}
      <section className="py-12 bg-gradient-to-br from-black/50 to-solana/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Trophy size={24} className="text-solana" />
            <h2 className="text-xl font-bold text-white">Popular Categories</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {['DeFi', 'NFTs', 'Trading', 'Development', 'Gaming', 'Education'].map((category) => (
              <div key={category} className="stream-card bg-secondary p-4 text-center">
                <div className="h-16 w-16 bg-solana/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-solana font-bold">{category.charAt(0)}</span>
                </div>
                <h3 className="text-white font-medium">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Streams */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Video size={24} className="text-solana" />
              <h2 className="text-xl font-bold text-white">Popular Streams</h2>
            </div>
            <Link to="/streams" className="text-solana hover:underline text-sm">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularStreams.map((stream) => (
              <StreamCard key={stream.id} {...stream} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-solana/20 to-solana-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Streaming?</h2>
            <p className="text-white/70 text-lg mb-8">
              Join the Solana streaming revolution. Create your own channel, build your audience, and earn SOL directly from your supporters.
            </p>
            <Link to="/create">
              <Button className="bg-solana hover:bg-solana/90 text-white">
                Apply to Become a Creator
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
