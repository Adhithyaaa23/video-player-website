# HLS Video Streaming POC

A full-stack proof-of-concept application that allows users to upload videos, converts them to HTTP Live Streaming (HLS) format using FFmpeg, and streams them seamlessly in a React frontend.

## Features

* **Backend:** Node.js Express server handling multipart file uploads via Multer.
* **Video Processing:** Automated conversion of uploaded video files into HLS segments (`.ts`) and playlists (`.m3u8`) using FFmpeg.
* **Frontend:** React application built with Vite, utilizing Video.js for HLS playback.
* **CORS Enabled:** Cross-origin resource sharing configured for local development between standard Vite ports.

## Prerequisites

* **Node.js:** v18 or v20+ recommended.
* **FFmpeg:** Must be installed and added to your system's PATH.
* *Windows:* Run `winget install ffmpeg` in PowerShell, then completely restart your IDE/terminal.



## Backend Setup

1. Navigate to your backend directory.
2. Install the required dependencies:
```bash
npm install express cors multer uuid

```


3. Start the Express server (it is configured to auto-create the necessary `uploads` directories on launch):
```bash
node index.js

```


*(The server runs on `http://localhost:8000`)*

## Frontend Setup

1. Navigate to your Vite frontend directory.
2. Install standard dependencies and the legacy Video.js package (required for v8 API compatibility):
```bash
npm install
npm install video.js@8

```


3. Start the Vite development server:
```bash
npm run dev

```



## How It Works

1. The React frontend sends a video file to the backend `/upload` endpoint using a `FormData` object. The appended field name must exactly match `"file"`.
2. Multer receives the video and saves it to the `uploads` directory.
3. Node's `child_process.exec` triggers FFmpeg to transcode the video into 10-second `.ts` segments, generating an `index.m3u8` playlist inside a unique UUID-named folder.
4. The backend returns the newly generated `.m3u8` streaming URL, which is then passed to the frontend Video.js component for playback.
