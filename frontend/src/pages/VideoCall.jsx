import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { io } from "socket.io-client";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

const VideoCall = () => {

  const { sessionId } = useParams();

  const navigate = useNavigate();

  const socketRef = useRef();

  const peerRef = useRef();

  const localVideoRef = useRef();

  const remoteVideoRef = useRef();

  const localStreamRef = useRef();

  const remoteSocketRef = useRef();

  const [connected, setConnected] =
    useState(false);

  const [isMuted, setIsMuted] =
    useState(false);

  const [isCameraOff, setIsCameraOff] =
    useState(false);

  const [isSharing, setIsSharing] =
    useState(false);

  // SOCKET START
  useEffect(() => {

    socketRef.current = io(
      "http://localhost:8000"
    );

    startMedia();

    // CLEANUP
    return () => {

      if (peerRef.current) {
        peerRef.current.close();
      }

      if (socketRef.current) {
        socketRef.current.disconnect();
      }

      if (localStreamRef.current) {
        localStreamRef.current
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      }
    };

  }, []);

  // START MEDIA
  const startMedia = async () => {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            video: true,
            audio: true,
          }
        );

      localStreamRef.current =
        stream;

      // SHOW LOCAL
      if (localVideoRef.current) {

        localVideoRef.current.srcObject =
          stream;

        await localVideoRef.current.play();
      }

      createPeer();

      // JOIN ROOM
      socketRef.current.emit(
        "join-room",
        sessionId
      );

      // USER JOINED
      socketRef.current.on(
        "user-joined",
        async (userId) => {

          console.log(
            "USER JOINED:",
            userId
          );

          remoteSocketRef.current =
            userId;

          const offer =
            await peerRef.current.createOffer();

          await peerRef.current.setLocalDescription(
            offer
          );

          socketRef.current.emit(
            "offer",
            {
              offer,
              to: userId,
            }
          );
        }
      );

      // RECEIVE OFFER
      socketRef.current.on(
        "offer",
        async ({ offer, from }) => {

          console.log(
            "OFFER RECEIVED"
          );

          remoteSocketRef.current =
            from;

          await peerRef.current.setRemoteDescription(
            new RTCSessionDescription(
              offer
            )
          );

          const answer =
            await peerRef.current.createAnswer();

          await peerRef.current.setLocalDescription(
            answer
          );

          socketRef.current.emit(
            "answer",
            {
              answer,
              to: from,
            }
          );
        }
      );

      // RECEIVE ANSWER
      socketRef.current.on(
        "answer",
        async ({ answer }) => {

          console.log(
            "ANSWER RECEIVED"
          );

          await peerRef.current.setRemoteDescription(
            new RTCSessionDescription(
              answer
            )
          );

          setConnected(true);
        }
      );

      // RECEIVE ICE
      socketRef.current.on(
        "ice-candidate",
        async ({ candidate }) => {

          try {

            if (candidate) {

              await peerRef.current.addIceCandidate(
                new RTCIceCandidate(
                  candidate
                )
              );
            }

          } catch (err) {
            console.log(err);
          }
        }
      );

    } catch (err) {

      console.log(
        "MEDIA ERROR:",
        err
      );
    }
  };

  // CREATE PEER
  const createPeer = () => {

    peerRef.current =
      new RTCPeerConnection({
        iceServers: [
          {
            urls:
              "stun:stun.l.google.com:19302",
          },
        ],
      });

    // ADD TRACKS
    localStreamRef.current
      .getTracks()
      .forEach((track) => {

        peerRef.current.addTrack(
          track,
          localStreamRef.current
        );
      });

    // REMOTE TRACK
    peerRef.current.ontrack =
      async (event) => {

        console.log(
          "REMOTE TRACK RECEIVED"
        );

        const remoteStream =
          event.streams[0];

        if (
          remoteVideoRef.current &&
          remoteStream
        ) {

          remoteVideoRef.current.srcObject =
            remoteStream;

          try {

            await remoteVideoRef.current.play();

          } catch (err) {
            console.log(err);
          }

          setConnected(true);
        }
      };

    // ICE
    peerRef.current.onicecandidate =
      (event) => {

        if (
          event.candidate &&
          remoteSocketRef.current
        ) {

          socketRef.current.emit(
            "ice-candidate",
            {
              candidate:
                event.candidate,
              to: remoteSocketRef.current,
            }
          );
        }
      };
  };

  // MUTE
  const toggleMute = () => {

    const audioTrack =
      localStreamRef.current
        .getAudioTracks()[0];

    audioTrack.enabled =
      !audioTrack.enabled;

    setIsMuted(
      !audioTrack.enabled
    );
  };

  // CAMERA
  const toggleCamera = () => {

    const videoTrack =
      localStreamRef.current
        .getVideoTracks()[0];

    videoTrack.enabled =
      !videoTrack.enabled;

    setIsCameraOff(
      !videoTrack.enabled
    );
  };

  // SCREEN SHARE
  const shareScreen =
    async () => {

      try {

        if (!isSharing) {

          const screenStream =
            await navigator.mediaDevices.getDisplayMedia(
              {
                video: true,
              }
            );

          const screenTrack =
            screenStream.getVideoTracks()[0];

          const sender =
            peerRef.current
              .getSenders()
              .find(
                (s) =>
                  s.track.kind ===
                  "video"
              );

          sender.replaceTrack(
            screenTrack
          );

          localVideoRef.current.srcObject =
            screenStream;

          setIsSharing(true);

          // STOP SHARE
          screenTrack.onended =
            () => {

              const cameraTrack =
                localStreamRef.current
                  .getVideoTracks()[0];

              sender.replaceTrack(
                cameraTrack
              );

              localVideoRef.current.srcObject =
                localStreamRef.current;

              setIsSharing(false);
            };

        } else {

          const cameraTrack =
            localStreamRef.current
              .getVideoTracks()[0];

          const sender =
            peerRef.current
              .getSenders()
              .find(
                (s) =>
                  s.track.kind ===
                  "video"
              );

          sender.replaceTrack(
            cameraTrack
          );

          localVideoRef.current.srcObject =
            localStreamRef.current;

          setIsSharing(false);
        }

      } catch (err) {

        console.log(
          "SCREEN SHARE ERROR:",
          err
        );
      }
    };

  // LEAVE
  const leaveCall = async () => {

  try {

    // STOP LOCAL STREAM
    if (localStreamRef.current) {

      localStreamRef.current.getTracks().forEach(track => {
        track.stop();
      });

      localStreamRef.current = null;
    }

    // STOP REMOTE STREAM
    if (remoteVideoRef.current?.srcObject) {

      remoteVideoRef.current.srcObject
        .getTracks()
        .forEach(track => track.stop());

      remoteVideoRef.current.srcObject = null;
    }

    // REMOVE LOCAL VIDEO
    if (localVideoRef.current) {
      localVideoRef.current.pause();
      localVideoRef.current.srcObject = null;
    }

    // CLOSE PEER CONNECTION
    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }

    // DISCONNECT SOCKET
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    // EXTRA HARD CAMERA SHUTDOWN FIX
    const devices = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    devices.getTracks().forEach(track => track.stop());

    // NAVIGATE
    navigate("/meeting");

    // FORCE PAGE RELOAD
    setTimeout(() => {
      window.location.reload();
    }, 100);

  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-black text-white flex flex-col items-center px-6 py-5">

      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-3">
        🎥 Video Interview Room
      </h1>

      {/* ROOM ID */}
      <p className="text-lg text-zinc-300 mb-6">
        Room ID:
        <span className="text-pink-400 font-bold ml-2">
          {sessionId}
        </span>
      </p>

      {/* VIDEOS */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">

        {/* LOCAL */}
        <div className="flex-1 relative">

          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-[350px] rounded-3xl object-cover border-4 border-purple-500 bg-black shadow-[0_0_40px_#a855f7]"
          />

          <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-full">
            You
          </div>
        </div>

        {/* REMOTE */}
        <div className="flex-1 relative">

          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-[350px] rounded-3xl object-cover border-4 border-pink-500 bg-black shadow-[0_0_40px_#ec4899]"
          />

          <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-full">
            Candidate
          </div>
        </div>
      </div>

      {/* WAITING */}
      {!connected && (
        <p className="mt-6 text-zinc-400 animate-pulse">
          Waiting for another user
          to join...
        </p>
      )}

      {/* BUTTONS */}
      <div className="mt-8 flex gap-4 bg-white/10 px-7 py-4 rounded-full backdrop-blur-xl">

        {/* MUTE */}
        <button
          onClick={toggleMute}
          className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-full"
        >
          {isMuted
            ? "🔇 Unmute"
            : "🎤 Mute"}
        </button>

        {/* CAMERA */}
        <button
          onClick={toggleCamera}
          className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-full"
        >
          {isCameraOff
            ? "📷 On"
            : "📷 Camera"}
        </button>

        {/* SHARE */}
        <button
          onClick={shareScreen}
          className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-full"
        >
          {isSharing
            ? "🖥 Stop Share"
            : "🖥 Share Screen"}
        </button>

        {/* LEAVE */}
        <button
          onClick={leaveCall}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full font-bold"
        >
          ❌ Leave
        </button>
      </div>
    </div>
  );
};

export default VideoCall;