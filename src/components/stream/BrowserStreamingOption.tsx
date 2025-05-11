
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useBrowserMediaCheck } from '@/hooks/useBrowserMediaCheck';
import { useNavigate } from 'react-router-dom';
import { Play, RefreshCw } from 'lucide-react';

const BrowserStreamingOption = () => {
  const navigate = useNavigate();
  const { 
    hasCameraPermission, 
    hasAudioPermission, 
    isCheckingPermissions, 
    checkMediaPermissions 
  } = useBrowserMediaCheck();

  const handleStartBrowserStreaming = () => {
    navigate('/create/stream/browser');
  };

  return (
    <Card className="bg-black/40 border-white/10 mb-6">
      <CardHeader>
        <CardTitle>Browser Streaming</CardTitle>
        <CardDescription>Stream directly from your browser without additional software</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            Stream directly from your browser using your webcam and microphone. This is the quickest way to start streaming.
          </p>
          
          <div className="bg-black/20 p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">System Requirements:</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-white/70">
              <li>A modern browser (Chrome, Firefox, Edge)</li>
              <li>Webcam access</li>
              <li>Microphone access</li>
              <li>Stable internet connection</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium mb-1">Permissions Status:</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  hasCameraPermission === null 
                    ? 'bg-yellow-400' 
                    : hasCameraPermission 
                      ? 'bg-green-400' 
                      : 'bg-red-400'
                }`} />
                <span className="text-sm">Camera: {
                  hasCameraPermission === null 
                    ? 'Not checked' 
                    : hasCameraPermission 
                      ? 'Available' 
                      : 'Not available'
                }</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  hasAudioPermission === null 
                    ? 'bg-yellow-400' 
                    : hasAudioPermission 
                      ? 'bg-green-400' 
                      : 'bg-red-400'
                }`} />
                <span className="text-sm">Microphone: {
                  hasAudioPermission === null 
                    ? 'Not checked' 
                    : hasAudioPermission 
                      ? 'Available' 
                      : 'Not available'
                }</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={checkMediaPermissions}
          disabled={isCheckingPermissions}
        >
          {isCheckingPermissions ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            'Check Permissions'
          )}
        </Button>
        <Button 
          onClick={handleStartBrowserStreaming}
          className="bg-solana hover:bg-solana/90"
          disabled={hasCameraPermission === false || hasAudioPermission === false}
        >
          <Play className="mr-2 h-4 w-4" />
          Start Browser Streaming
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BrowserStreamingOption;
