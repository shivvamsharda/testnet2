
import React from "react";

export default function GoLiveBrowser() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Go Live from Browser (No OBS)</h1>
      <p className="mb-4">
        Livepeer browser-based streaming is still experimental. To push your camera stream directly to Livepeer:
      </p>
      <ol className="list-decimal ml-6 mb-4 space-y-2">
        <li>
          Clone the official repo:{" "}
          <a
            className="text-blue-500 underline"
            href="https://github.com/livepeer/livepeer-media-server"
            target="_blank"
            rel="noopener noreferrer"
          >
            livepeer-media-server
          </a>
        </li>
        <li>Follow instructions to install dependencies and start the dev server</li>
        <li>Enter your stream key + Livepeer ingest URL (usually rtmp://rtmp.livepeer.com/live)</li>
        <li>Click “Start Streaming” from the browser</li>
      </ol>
      <p className="text-yellow-500">
        We are working on integrating this natively in the SolStream platform. Stay tuned!
      </p>
    </div>
  );
}
