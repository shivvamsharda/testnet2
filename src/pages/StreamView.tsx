
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LivepeerPlayer from '../components/stream/LivepeerPlayer';
import { supabase } from '@/integrations/supabase/client';

const StreamView = () => {
  const { id } = useParams();
  const [playbackId, setPlaybackId] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchStream = async () => {
      console.log("Fetching stream ID:", id);

      const { data, error } = await supabase
        .from('streams')
        .select('*')
        .eq('id', id)
        .single();

      console.log("Fetched Supabase stream:", data);
      if (error) console.error("Supabase error:", error);

      if (data) {
        const playbackUrl = data.playback_url;
        console.log("Playback URL:", playbackUrl);
        const match = playbackUrl?.match(/hls\/(.*?)\/index\.m3u8/);
        console.log("Extracted playbackId:", match?.[1]);
        if (match) setPlaybackId(match[1]);
        setTitle(data.title);
      } else {
        // Fallback to test ID
        console.warn("No stream found. Using fallback playbackId");
        setPlaybackId("6d7el73r1y12chxr");
        setTitle("Fallback Test Stream");
      }
    };

    if (id) fetchStream();
  }, [id]);

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        {playbackId ? (
          <LivepeerPlayer playbackId={playbackId} />
        ) : (
          <p>Loading stream...</p>
        )}
      </div>
    </Layout>
  );
};

export default StreamView;
