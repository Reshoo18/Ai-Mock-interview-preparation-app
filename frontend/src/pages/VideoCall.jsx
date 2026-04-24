import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";

// 🔥 SOCKET CONNECTION
const socket = io("http://localhost:8000");

const VideoCall = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const peerConnection = useRef(null);

  // ✅ STATE (IMPORTANT)
  const [stream, setStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    startCall();

    return () => {
      socket.disconnect();
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, []);

  const startCall = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // ✅ SAVE STREAM
      setStream(localStream);

      // SHOW LOCAL VIDEO
      if (localVideo.current) {
        localVideo.current.srcObject = localStream;
      }

      peerConnection.current = new RTCPeerConnection();

      // ADD TRACKS
      localStream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream);
      });

      // REMOTE VIDEO
      peerConnection.current.ontrack = (event) => {
        if (remoteVideo.current) {
          remoteVideo.current.srcObject = event.streams[0];
          setConnected(true);
        }
      };

      // ICE
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            candidate: event.candidate,
          });
        }
      };

      // JOIN ROOM
      socket.emit("join-room", sessionId);

      // WHEN OTHER USER JOINS
      socket.on("user-joined", async (userId) => {
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);

        socket.emit("offer", { offer, to: userId });
      });

      // RECEIVE OFFER
      socket.on("offer", async ({ offer, from }) => {
        await peerConnection.current.setRemoteDescription(offer);

        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);

        socket.emit("answer", { answer, to: from });
      });

      // RECEIVE ANSWER
      socket.on("answer", async ({ answer }) => {
        await peerConnection.current.setRemoteDescription(answer);
      });

      // ICE CANDIDATE
      socket.on("ice-candidate", async ({ candidate }) => {
        try {
          await peerConnection.current.addIceCandidate(candidate);
        } catch (err) {
          console.error(err);
        }
      });

    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  // 🔴 LEAVE CALL
  const leaveCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    socket.disconnect();

    if (peerConnection.current) {
      peerConnection.current.close();
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6">

      {/* TITLE */}
      <h2 className="text-white text-xl mb-6 font-semibold">
        Video Call Room: {sessionId}
      </h2>

      {/* VIDEO SECTION */}
      <div className="flex gap-6 w-full max-w-5xl">
        <video
          ref={localVideo}
          autoPlay
          muted
          className="w-1/2 rounded-xl bg-black border border-gray-700 shadow-lg"
        />
        <video
          ref={remoteVideo}
          autoPlay
          className="w-1/2 rounded-xl bg-black border border-gray-700 shadow-lg"
        />
      </div>

      {/* STATUS */}
      {!connected && (
        <p className="text-gray-400 mt-4">
          Waiting for another user to join...
        </p>
      )}

      {/* CONTROLS */}
      <div className="flex gap-6 mt-8 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">

        {/* 🎤 MUTE */}
        <button
          onClick={() => {
            if (!stream) return;

            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
              audioTrack.enabled = !audioTrack.enabled;
              setIsMuted(!audioTrack.enabled);
            }
          }}
          className="text-white hover:text-pink-400 transition"
        >
          {isMuted ? "🔇 Unmute" : "🎤 Mute"}
        </button>

        {/* 🎥 CAMERA */}
        <button
          onClick={() => {
            if (!stream) return;

            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
              videoTrack.enabled = !videoTrack.enabled;
              setIsCameraOff(!videoTrack.enabled);
            }
          }}
          className="text-white hover:text-yellow-400 transition"
        >
          {isCameraOff ? "📷 Turn On" : "🎥 Camera"}
        </button>

        {/* ❌ LEAVE */}
        <button
          onClick={leaveCall}
          className="text-red-400 hover:text-red-300 transition font-semibold"
        >
          ❌ Leave
        </button>

      </div>
    </div>
  );
};

export default VideoCall;