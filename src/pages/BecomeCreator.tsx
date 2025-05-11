import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Video, Users, Trophy, Coins, ChevronRight, PlayCircle } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { useToast } from '@/components/ui/use-toast';

const BecomeCreator = () => {
  const { connected, connectWallet } = useWallet();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleStartStreaming = async () => {
    if (!connected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your Solana wallet to start streaming.",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to a new stream creation page
    navigate('/create/stream');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-solana/30 to-solana-secondary/10 opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="border-solana text-solana mb-4 px-4 py-1">
              Creator Program
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Become a <span className="solana-gradient bg-clip-text text-transparent">Solana</span> Creator
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Share your Solana expertise, build an audience, and earn SOL directly from your supporters through livestreams, recorded content, and exclusive NFT access.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {connected ? (
                <Button 
                  size="lg" 
                  className="bg-solana hover:bg-solana/90 text-white"
                  onClick={handleStartStreaming}
                >
                  Start Streaming <ChevronRight className="ml-1" />
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="bg-solana hover:bg-solana/90 text-white"
                  onClick={() => connectWallet('Phantom')}
                >
                  Connect Wallet to Stream <ChevronRight className="ml-1" />
                </Button>
              )}
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                <PlayCircle className="mr-1" /> Watch Creator Stories
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Create on SolStream?</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              SolStream gives you the tools and audience to share your Solana knowledge while earning SOL directly from your supporters.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-secondary border-white/5">
              <CardHeader>
                <div className="h-12 w-12 bg-solana/20 rounded-full flex items-center justify-center mb-4">
                  <Coins className="h-6 w-6 text-solana" />
                </div>
                <CardTitle className="text-white">Direct SOL Earnings</CardTitle>
              </CardHeader>
              <CardContent className="text-white/70">
                Receive SOL donations directly to your wallet during streams. No platform fees on tips for verified creators.
              </CardContent>
            </Card>
            
            <Card className="bg-secondary border-white/5">
              <CardHeader>
                <div className="h-12 w-12 bg-solana/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-solana" />
                </div>
                <CardTitle className="text-white">Engaged Community</CardTitle>
              </CardHeader>
              <CardContent className="text-white/70">
                Connect with Solana enthusiasts who share your interests and are looking for quality content and insights.
              </CardContent>
            </Card>
            
            <Card className="bg-secondary border-white/5">
              <CardHeader>
                <div className="h-12 w-12 bg-solana/20 rounded-full flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-solana" />
                </div>
                <CardTitle className="text-white">Creator Rewards</CardTitle>
              </CardHeader>
              <CardContent className="text-white/70">
                Top creators earn monthly SOL rewards, exclusive NFTs, and opportunities to collaborate with Solana projects.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-gradient-to-br from-black/50 to-solana/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Getting started as a SolStream creator is simple. Just follow these steps:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: "Connect Wallet",
                description: "Connect your Solana wallet to establish your identity and receive donations."
              },
              {
                step: 2,
                title: "Set Up Your Stream",
                description: "Configure your stream title, description, and other details."
              },
              {
                step: 3,
                title: "Start Streaming",
                description: "Go live with your first stream and start building your audience."
              }
            ].map(item => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 bg-solana text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-center">{item.description}</p>
                </div>
                {item.step < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-solana/30 -z-10 transform -translate-x-8">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 h-2 w-2 bg-solana rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Content Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Content You Can Create</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Share your Solana expertise through various content formats:
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Educational Content",
                description: "Tutorials, guides, and educational content about Solana's ecosystem.",
                icon: <Video className="h-6 w-6 text-solana" />
              },
              {
                title: "Market Analysis",
                description: "Price predictions, token reviews, and technical analysis of the Solana market.",
                icon: <Video className="h-6 w-6 text-solana" />
              },
              {
                title: "Development Tutorials",
                description: "Coding tutorials for Solana smart contracts and dApp development.",
                icon: <Video className="h-6 w-6 text-solana" />
              },
              {
                title: "NFT Showcases",
                description: "NFT reveals, collection reviews, and artworks showcases.",
                icon: <Video className="h-6 w-6 text-solana" />
              },
              {
                title: "AMAs & Interviews",
                description: "Host AMAs with Solana developers, project founders and community members.",
                icon: <Video className="h-6 w-6 text-solana" />
              },
              {
                title: "Gaming & P2E",
                description: "Play-to-earn gaming streams, tournament broadcasts, and strategy guides.",
                icon: <Video className="h-6 w-6 text-solana" />
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-6 bg-secondary border border-white/5 rounded-lg">
                <div className="h-12 w-12 bg-solana/10 rounded-full flex-shrink-0 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Streaming Tips */}
      <section className="py-16 bg-gradient-to-br from-black/50 to-solana/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Streaming Tips</h2>
              <p className="text-white/70">
                To ensure quality streams and engage with your audience effectively, here are some tips:
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                "Use a stable internet connection with at least 5 Mbps upload speed",
                "Ensure good lighting and clear audio for better viewer experience",
                "Engage with your chat and respond to questions regularly",
                "Promote your stream on your social media channels",
                "Be consistent with your streaming schedule to build a regular audience"
              ].map((tip, index) => (
                <div key={index} className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-solana flex-shrink-0" />
                  <span className="text-white">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Creator FAQ</h2>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "How do I get paid for my streams?",
                  answer: "Viewers can send SOL donations directly to your connected wallet during streams. There are no platform fees for these donations."
                },
                {
                  question: "What equipment do I need?",
                  answer: "At minimum, you need a computer with a webcam and microphone. For better quality, we recommend a dedicated microphone and camera with good lighting."
                },
                {
                  question: "Can I stream on other platforms simultaneously?",
                  answer: "Yes, SolStream allows simulcasting to other platforms."
                },
                {
                  question: "How do I grow my audience?",
                  answer: "We feature new and trending creators on our homepage and provide promotional opportunities through our social channels for active creators."
                },
                {
                  question: "Is there any review process for my streams?",
                  answer: "No. You can start streaming immediately after connecting your wallet, though we do have community guidelines that all creators must follow."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-secondary border border-white/5 rounded-lg overflow-hidden">
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
                    <p className="text-white/70">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-solana/30 to-solana-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Streaming?</h2>
            <p className="text-white/80 text-lg mb-8">
              Connect your Solana wallet and start sharing your content with the world.
            </p>
            {connected ? (
              <Button 
                size="lg" 
                className="bg-solana hover:bg-solana/90 text-white"
                onClick={handleStartStreaming}
              >
                Start Streaming Now
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="bg-solana hover:bg-solana/90 text-white"
                onClick={() => connectWallet('Phantom')}
              >
                Connect Wallet to Stream
              </Button>
            )}
            <div className="mt-4 text-white/50 text-sm">
              Start in under a minute with just a few clicks
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BecomeCreator;
