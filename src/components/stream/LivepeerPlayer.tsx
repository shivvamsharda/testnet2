
import React, { useState, useEffect } from 'react';
import { Player, usePlaybackInfo } from '@livepeer/react';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldAlert, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LivepeerPlayerProps {
  playbackId?: string;
  isTerminated?: boolean;
  violationType?: string;
}

const LivepeerPlayer = ({ playbackId, isTerminated = false, violationType }: LivepeerPlayerProps) => {
  const [retryCount, setRetryCount] = useState(0);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Force re-render of player when retry button is clicked
  const handleRetry = () => {
    setPlaybackError(null);
    setIsLoading(true);
    setRetryCount(prev => prev + 1);
  };

  const { data: playbackInfo, error } = usePlaybackInfo({
    playbackId: playbackId,
    enabled: !!playbackId && !isTerminated,
    refetchInterval: playbackError ? false : 5000, // Only poll if no errors
  });

  // Detect errors from the usePlaybackInfo hook
  useEffect(() => {
    if (error) {
      console.error("Playback info error:", error);
      setPlaybackError("Failed to load stream information");
      setIsLoading(false);
    } else if (playbackInfo) {
      // Reset loading once playback info is available
      setIsLoading(false);
    }
  }, [error, playbackInfo]);

  // Additional logging for debugging
  useEffect(() => {
    if (playbackId) {
      console.log(`Attempting to play stream with playbackId: ${playbackId}`);
      console.log(`Current stream status - isTerminated: ${isTerminated}, hasError: ${!!playbackError}`);
    }
  }, [playbackId, isTerminated, playbackError]);

  if (isTerminated) {
    return (
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center bg-black/90">
          <div className="text-center">
            <ShieldAlert size={48} className="mx-auto mb-4 text-red-500" />
            <h3 className="text-white text-xl mb-2">Stream Terminated</h3>
            <p className="text-white/80 mb-2">This stream has been terminated due to a content policy violation.</p>
            <p className="text-white/50 text-sm">
              Our system detected prohibited content: {violationType?.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!playbackId) {
    return (
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center">
            <p className="text-white/80 mb-2">No stream available</p>
            <p className="text-white/50 text-sm">
              The creator hasn't started streaming yet
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden relative">
      {!playbackError && (
        <Player
          key={`player-${playbackId}-${retryCount}`} // Force re-render on retry
          playbackId={playbackId}
          autoPlay={true}
          muted={true}
          showTitle={false}
          aspectRatio="16to9"
          showPipButton
          loop
          priority
          refetchPlaybackInfoInterval={10000}
          onError={(error) => {
            console.error("Player error:", error);
            setPlaybackError("Failed to play stream");
            setIsLoading(false);
          }}
          theme={{
            colors: {
              accent: '#9945FF',
            },
            sizes: {
              thumb: '12px',
            },
            space: {
              controlsBottomMarginX: '10px',
              controlsBottomMarginY: '5px',
            },
            radii: {
              slider: '4px',
            },
          }}
        />
      )}
      
      {/* Loading state */}
      {isLoading && !playbackError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Skeleton className="w-12 h-12 rounded-full" />
        </div>
      )}
      
      {/* Error state with retry button */}
      {playbackError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90">
          <div className="text-center p-4">
            <AlertTriangle size={36} className="mx-auto mb-3 text-yellow-500" />
            <h3 className="text-white text-lg mb-2">Playback Failed</h3>
            <p className="text-white/70 mb-4">
              We're having trouble playing this stream. The stream might not be active yet or there could be a connection issue.
            </p>
            <Button 
              onClick={handleRetry}
              className="bg-solana hover:bg-solana/80 text-white flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Retry Playback
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivepeerPlayer;
