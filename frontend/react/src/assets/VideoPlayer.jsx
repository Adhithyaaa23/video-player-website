import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ options, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Video.js player only once
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        if (onReady) onReady(player);
      }));
    } else {
      // 2. Update the player source when a new video is uploaded
      const player = playerRef.current;
      player.src(options.sources);
    }
  // FIXED: Only re-run when the specific video URL changes, preventing infinite loops
  }, [options.sources[0].src]); 

  // 3. Dispose the player when the component unmounts
  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player style={{ width: "100%", maxWidth: "800px", margin: "20px auto" }}>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;