
import React from "react";
import { LivepeerConfig, createReactClient, studioProvider } from "@livepeer/react";
import { Broadcast } from "@livepeer/react";

const client = createReactClient({
  provider: studioProvider({ apiKey: "7acde7fe-891c-4fee-abeb-eeb23e383483" }),
});

const App = () => {
  return (
    <LivepeerConfig client={client}>
      <div style={{ padding: 20 }}>
        <h1>📡 Native Browser Streaming with Livepeer</h1>
        <Broadcast />
        <p style={{ marginTop: 20 }}>
          Your video will stream to Livepeer and be viewable via the generated <code>playback URL</code>.
        </p>
      </div>
    </LivepeerConfig>
  );
};

export default App;
