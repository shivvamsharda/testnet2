
import React, { useState, useRef, useEffect } from 'react';
import {
  useCreateStream,
  useStream,
  useStreamSession,
} from '@livepeer/react';
import { supabase } from '@/integrations/supabase/client';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Player } from '@livepeer/react';

const BrowserStreamingStudio = () => {
  const { connected, publicKey, isAuthenticated } = useWallet();
  const videoRef = useRef(null);

  const [streamName, setStreamName] = useState(`${publicKey?.toString().slice(0, 8) || 'Anonymous'}'s Stream`);
  const [streamId, setStreamId] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);

  const {
    mutate: createStream,
    data: stream,
    status,
    error,
  } = useCreateStream({
    name: streamName,
    record: true,
  });

  const { data: streamData } = useStream({
    streamId,
    enabled: !!streamId,
  });

  const { data: streamSession } = useStreamSession({
    streamId,
    enabled: !!streamId,
  });

  const startCamera = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = media;
      }
      setMediaStream(media);
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const handleStartStream = async () => {
    createStream();
  };

  useEffect(() => {
    if (stream?.id) {
      setStreamId(stream.id);

      // Save to Supabase
      if (publicKey) {
        supabase.from("streams").insert({
          title: streamName,
          playback_url: `https://livepeercdn.com/hls/${stream.playbackId}/index.m3u8`,
          stream_key: stream.streamKey,
          wallet: publicKey.toString(),
        });
      }
    }
  }, [stream]);

  useEffect(() => {
    startCamera();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Browser Streaming</h2>
      <Input value={streamName} onChange={(e) => setStreamName(e.target.value)} />
      <video ref={videoRef} autoPlay muted className="w-full rounded-lg border" />
      <Button onClick={handleStartStream}>Create Stream</Button>
      {stream?.playbackId && (
        <Player playbackId={stream.playbackId} autoPlay muted />
      )}
    </div>
  );
};

export default BrowserStreamingStudio;
