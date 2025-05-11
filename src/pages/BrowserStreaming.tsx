
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import BrowserStreamingStudio from '@/components/stream/BrowserStreamingStudio';
import { useWallet } from '@/context/WalletContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const BrowserStreaming = () => {
  const { connected, isAuthenticated } = useWallet();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!connected) {
      toast.error("Please connect your wallet to access streaming", {
        description: "Wallet connection is required for streaming"
      });
      navigate('/create/stream');
      return;
    }
    
    if (!isAuthenticated) {
      toast.error("Please authenticate your wallet", {
        description: "Wallet authentication is required for streaming"
      });
      navigate('/create/stream');
    }
  }, [connected, isAuthenticated, navigate]);
  
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Broadcast Studio</h1>
        <BrowserStreamingStudio />
      </div>
    </Layout>
  );
};

export default BrowserStreaming;
