
import React, { useEffect, useRef, useState } from "react";

export default function BrowserStream() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const startStream = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
        videoRef.current.play();
      }
      setStream(userStream);
    } catch (err) {
      console.error("Error accessing camera/mic", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Browser-Based Streaming</h1>
      <button
        onClick={startStream}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Start Camera
      </button>
      <div className="mt-4">
        <video ref={videoRef} width="640" height="480" controls muted />
      </div>
    </div>
  );
}
