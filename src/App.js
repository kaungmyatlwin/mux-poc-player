import { useState, useEffect, useRef } from 'react';
import './App.css';
import Hls from 'hls.js';

function App() {
  const [playbackId, setPlaybackId] = useState('Yo6TW3h3ef1N01qTgunTCjufFEhfLraRlFLPTg01QYiCE.m3u8');
  const videoRef = useRef(null);
  const videoSrc = `https://stream.mux.com/${playbackId}.m3u8`

  useEffect(() => {
    let hls;

    if (videoRef.current) {
      const video = videoRef.current;

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
      } else if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
      } else {
        console.error('This browser doesn\'t support video.');
      }
    }

    return () => {
      if (hls) {
        hls.destroy()
      };
    };
  }, [videoRef, videoSrc]);

  return (
    <>
      <div className="container text-center font-weight-bold mt-3">
        This is the implementation example of MUX player in React with HLS + React.
      </div>
      <div className="container d-flex justify-content-center" style={{ marginTop: 30 }}>
        <div className="row">
          <ul>
            <li>1. Paste your MUX playback ID.</li>
            <li>2. Wait for awhile for video to load.</li>
            <li>3. Play.</li>
          </ul>
        </div>
      </div>
      <div className="container">
        <label for="pbId">Paste your Playback ID 👇</label><br />
        <input type="text" className="form-control" name="pbId" placeholder="Paste your Playback ID" value={playbackId} onChange={e => setPlaybackId(e.target.value)} />
      </div>
      <div className="container w-100 mt-3">
        <div className="mb-3 text-center">Now playing: {videoSrc}</div>
        <div className="d-flex justify-content-center">
          <video ref={videoRef} controls style={{ width: "100%", maxWidth: "500px" }}/>
        </div>
      </div>
    </>
  );
}

export default App;
