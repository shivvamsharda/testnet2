
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PublicKey } from "@solana/web3.js";

// Message to sign for wallet authentication
const AUTH_MESSAGE = "Sign this message to authenticate with SolStream";

// Convert string to Uint8Array for signature
const messageToBytes = (message: string): Uint8Array => {
  return new TextEncoder().encode(message);
};

// Handle wallet authentication with Supabase
export const authenticateWallet = async (
  publicKey: PublicKey,
  signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>
): Promise<boolean> => {
  try {
    // 1. Sign the authentication message with wallet
    const message = messageToBytes(AUTH_MESSAGE);
    const { signature } = await signMessage(message);
    
    // 2. Convert signature to base64 string for backend verification
    const signatureBase64 = Buffer.from(signature).toString('base64');
    
    // 3. Call Supabase function to authenticate wallet
    const { data, error } = await supabase.rpc('auth_wallet', {
      wallet_address: publicKey.toString(),
      signature: signatureBase64
    });
    
    if (error) {
      console.error('Authentication error:', error);
      toast.error("Authentication failed", {
        description: error.message
      });
      return false;
    }
    
    if (!data) {
      toast.error("Invalid authentication response");
      return false;
    }
    
    // Type assertion to ensure we have the correct structure
    const authData = data as { token: string; wallet_address: string };
    
    // 4. Store session in local storage
    const session = {
      access_token: authData.token,
      wallet_address: authData.wallet_address
    };
    
    // 5. Set session in Supabase
    await supabase.auth.setSession({
      access_token: authData.token,
      refresh_token: '' // Not used with wallet auth
    });
    
    // 6. Store wallet session data
    localStorage.setItem('wallet_session', JSON.stringify(session));
    
    toast.success("Wallet connected and authenticated!");
    return true;
    
  } catch (error: any) {
    console.error('Wallet authentication error:', error);
    toast.error("Authentication failed", {
      description: error.message || "Could not authenticate wallet"
    });
    return false;
  }
};

// Log out the current wallet session
export const logoutWalletSession = async (): Promise<void> => {
  try {
    // Clear Supabase session
    await supabase.auth.signOut();
    
    // Clear local wallet session
    localStorage.removeItem('wallet_session');
    
  } catch (error: any) {
    console.error('Logout error:', error);
  }
};

// Check if there's an active wallet session
export const getWalletSession = (): { access_token: string; wallet_address: string } | null => {
  try {
    const sessionStr = localStorage.getItem('wallet_session');
    if (!sessionStr) return null;
    
    return JSON.parse(sessionStr);
  } catch (error) {
    return null;
  }
};
