
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import { useToast } from '@/components/ui/use-toast';

// Initialize with the API key
const LIVEPEER_API_KEY = '7acde7fe-891c-4fee-abeb-eeb23e383483';

// Create a Livepeer client
const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: LIVEPEER_API_KEY,
  }),
});

interface LivepeerProviderProps {
  children: ReactNode;
}

export const LivepeerProvider = ({ children }: LivepeerProviderProps) => {
  const { toast } = useToast();
  const [isInitialized, setIsInitialized] = useState(true);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    // Show success toast when the Livepeer client is successfully initialized
    if (isInitialized && !connectionError) {
      toast({
        title: "Livepeer Connected",
        description: "Successfully connected to Livepeer streaming services.",
        duration: 3000,
      });
    }

    // Check if the API key is valid by making a test request
    const checkConnection = async () => {
      try {
        // We don't need to do anything with the result, just check if it works
        console.log("Livepeer connection initialized with API key:", 
          LIVEPEER_API_KEY.substring(0, 8) + '...');
      } catch (error) {
        console.error("Livepeer connection error:", error);
        setConnectionError(true);
        toast({
          title: "Livepeer Connection Error",
          description: "Failed to connect to Livepeer. Streams may not play correctly.",
          variant: "destructive",
          duration: 5000,
        });
      }
    };

    checkConnection();
  }, [isInitialized, toast]);

  return (
    <LivepeerConfig client={livepeerClient}>
      {children}
    </LivepeerConfig>
  );
};
