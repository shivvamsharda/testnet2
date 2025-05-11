import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/30 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/58a2fd02-f723-4751-a545-69f9992adc15.png" 
                alt="SolStream Logo" 
                className="h-10 w-auto" 
              />
            </div>
            <p className="text-white/70 text-sm">
              The ultimate streaming platform for Solana users and creators. Stream, donate, and engage with the Solana community.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-3">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/streams" className="text-white/70 hover:text-white transition-colors">
                  Browse Streams
                </Link>
              </li>
              <li>
                <Link to="/creators" className="text-white/70 hover:text-white transition-colors">
                  Creators
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Creator Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  API Docs
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-3">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} SolStream. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Terms</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Privacy</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
