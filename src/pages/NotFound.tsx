
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="h-24 w-24 mx-auto mb-6 rounded-full solana-gradient flex items-center justify-center">
            <span className="text-white text-4xl font-bold">404</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-white/70 mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button className="bg-solana hover:bg-solana/90 text-white">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
