import { useState } from 'react'
import './App.css'
import VideoPlayer from "./assets/VideoPlayer"
import { useRef } from 'react'
import videojs from 'video.js'

function App() {
  const playerRef = useRef(null)
  const videoLink = "http://localhost:8000/uploads/courses/be9e7e5f-12e4-489d-87ba-4c1517557d93/index.m3u8"

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL"
      }
    ]
  }
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
  return (
    <>
      <div>
        <h1>Video player</h1>
      </div>
      <VideoPlayer
      options={videoPlayerOptions}
      onReady={handlePlayerReady}
      />
    </>
  )
}

export default App