
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import StreamCard from '../components/stream/StreamCard';
import { Search, ArrowRight, TrendingUp, Clock, Star, Gamepad, ChevronRight } from 'lucide-react';

// Mock categories
const categories = [
  { id: 'defi', name: 'DeFi', count: 42 },
  { id: 'nfts', name: 'NFTs', count: 38 },
  { id: 'gaming', name: 'Gaming', count: 27 },
  { id: 'trading', name: 'Trading', count: 24 },
  { id: 'development', name: 'Development', count: 19 },
  { id: 'education', name: 'Education', count: 16 },
];

// Mock featured streams (reused from Index)
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

// Mock recommended streams
const recommendedStreams = [
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
];

const StartWatching = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Discover <span className="solana-gradient bg-clip-text text-transparent">Solana</span> Streams
            </h1>
            <p className="text-white/70 mb-8">
              Find the best Solana content creators and join live streams about DeFi, NFTs, trading, and more.
            </p>
            
            {/* Search */}
            <div className="flex gap-2 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search streams or creators"
                  className="pl-10 bg-secondary border-white/10 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-solana hover:bg-solana/90 text-white">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="mb-6 bg-secondary w-full sm:w-auto justify-start">
              <TabsTrigger value="trending" className="data-[state=active]:bg-solana">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="live" className="data-[state=active]:bg-solana">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></div>
                Live Now
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-solana">
                <Clock className="mr-2 h-4 w-4" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="following" className="data-[state=active]:bg-solana">
                <Star className="mr-2 h-4 w-4" />
                Following
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="trending" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredStreams.map((stream) => (
                  <StreamCard key={stream.id} {...stream} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="live" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredStreams
                  .filter(stream => stream.isLive)
                  .map((stream) => (
                    <StreamCard key={stream.id} {...stream} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-0">
              <div className="flex flex-col items-center py-12">
                <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-solana" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No Upcoming Streams</h3>
                <p className="text-white/70 mb-6 text-center max-w-md">
                  Connect your wallet to follow creators and get notified about their upcoming streams.
                </p>
                <Button className="bg-solana hover:bg-solana/90 text-white">
                  Connect Wallet
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="following" className="mt-0">
              <div className="flex flex-col items-center py-12">
                <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-solana" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Not Following Anyone Yet</h3>
                <p className="text-white/70 mb-6 text-center max-w-md">
                  Connect your wallet and follow your favorite creators to see their streams here.
                </p>
                <Button className="bg-solana hover:bg-solana/90 text-white">
                  Connect Wallet
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Gamepad size={20} className="mr-2 text-solana" />
              Popular Categories
            </h2>
            <Link to="/categories" className="text-solana hover:underline text-sm flex items-center">
              View All
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`}>
                <Card className="bg-secondary border-white/5 hover:bg-white/5 transition-colors">
                  <CardContent className="p-4 text-center">
                    <div className="h-12 w-12 bg-solana/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-solana font-bold">{category.name.charAt(0)}</span>
                    </div>
                    <h3 className="text-white font-medium mb-1">{category.name}</h3>
                    <p className="text-white/50 text-sm">{category.count} streams</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recommended */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Recommended For You</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="nft-content" />
                <label htmlFor="nft-content" className="text-sm text-white/70">NFT Content</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="defi-content" />
                <label htmlFor="defi-content" className="text-sm text-white/70">DeFi Content</label>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {recommendedStreams.map((stream) => (
              <StreamCard key={stream.id} {...stream} />
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline" className="border-white/10 text-white/70 hover:bg-white/5">
              Load More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StartWatching;
