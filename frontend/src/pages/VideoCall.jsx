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

  // SOCKET
  const socketRef = useRef(null);

  // VIDEO REFS
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);

  // PEER
  const peerConnection = useRef(null);

  // REMOTE USER
  const remoteSocketId = useRef(null);

  // STATES
  const [stream, setStream] =
    useState(null);

  const [connected, setConnected] =
    useState(false);

  const [isMuted, setIsMuted] =
    useState(false);

  const [isCameraOff, setIsCameraOff] =
    useState(false);

  // IMPORTANT
  // DEFAULT FALSE
  const [meetingStarted, setMeetingStarted] =
    useState(false);

  // ICE SERVERS
  const servers = {
    iceServers: [
      {
        urls:
          "stun:stun.l.google.com:19302",
      },
    ],
  };

  // SOCKET INIT ONLY
  useEffect(() => {
    socketRef.current = io(
      "http://localhost:8000"
    );

    return () => {
      cleanup();
    };
  }, []);

  // CLEANUP
  const cleanup = () => {
    if (stream) {
      stream
        .getTracks()
        .forEach((track) =>
          track.stop()
        );
    }

    if (peerConnection.current) {
      peerConnection.current.close();
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  };

  // START CALL
  const startCall = async () => {
    try {
      console.log(
        "START MEETING CLICKED"
      );

      // IMPORTANT
      setMeetingStarted(true);

      // GET USER MEDIA
      const localStream =
        await navigator.mediaDevices.getUserMedia(
          {
            video: true,
            audio: true,
          }
        );

      setStream(localStream);

      // SHOW LOCAL VIDEO
      if (localVideo.current) {
        localVideo.current.srcObject =
          localStream;

        await localVideo.current.play();
      }

      // CREATE PEER
      peerConnection.current =
        new RTCPeerConnection(servers);

      // ADD TRACKS
      localStream
        .getTracks()
        .forEach((track) => {
          peerConnection.current.addTrack(
            track,
            localStream
          );
        });

      // REMOTE TRACK
      peerConnection.current.ontrack =
        async (event) => {
          console.log(
            "REMOTE TRACK RECEIVED"
          );

          const remoteStream =
            event.streams[0];

          if (
            remoteVideo.current &&
            remoteStream
          ) {
            remoteVideo.current.srcObject =
              remoteStream;

            await remoteVideo.current.play();

            setConnected(true);
          }
        };

      // ICE
      peerConnection.current.onicecandidate =
        (event) => {
          if (
            event.candidate &&
            remoteSocketId.current
          ) {
            socketRef.current.emit(
              "ice-candidate",
              {
                candidate:
                  event.candidate,
                to: remoteSocketId.current,
              }
            );
          }
        };

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

          remoteSocketId.current =
            userId;

          const offer =
            await peerConnection.current.createOffer();

          await peerConnection.current.setLocalDescription(
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

          remoteSocketId.current =
            from;

          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(
              offer
            )
          );

          const answer =
            await peerConnection.current.createAnswer();

          await peerConnection.current.setLocalDescription(
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

          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(
              answer
            )
          );
        }
      );

      // RECEIVE ICE
      socketRef.current.on(
        "ice-candidate",
        async ({ candidate }) => {
          try {
            if (
              candidate &&
              peerConnection.current
                .remoteDescription
            ) {
              await peerConnection.current.addIceCandidate(
                new RTCIceCandidate(
                  candidate
                )
              );
            }
          } catch (err) {
            console.log(
              "ICE ERROR:",
              err
            );
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

  // LEAVE
  const leaveCall = () => {
    cleanup();

    navigate("/meeting");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-black flex flex-col items-center justify-center p-6">

      {/* TITLE */}
      <h1 className="text-white text-5xl font-bold mb-6">
        🎥 Video Interview Room
      </h1>

      {/* ROOM ID */}
      <p className="text-zinc-400 mb-8 text-lg">
        Room ID:
        <span className="text-pink-400 ml-2 font-bold">
          {sessionId}
        </span>
      </p>

      {/* DEBUG */}
      <h2 className="text-white mb-6">
        Meeting Started:
        {meetingStarted
          ? " TRUE"
          : " FALSE"}
      </h2>

      {/* START BUTTON */}
      {!meetingStarted && (
        <button
          onClick={startCall}
          className="mb-10 px-8 py-4 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg transition shadow-2xl"
        >
          Start Meeting
        </button>
      )}

      {/* VIDEO SECTION */}
      {meetingStarted && (
        <>
          <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">

            {/* LOCAL */}
            <div className="flex-1 relative">
              <video
                ref={localVideo}
                autoPlay
                muted
                playsInline
                className="w-full h-[350px] object-cover rounded-3xl border-4 border-purple-500 bg-black shadow-2xl shadow-purple-500/30"
              />

              <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-full text-white">
                You
              </div>
            </div>

            {/* REMOTE */}
            <div className="flex-1 relative">
              <video
                ref={remoteVideo}
                autoPlay
                playsInline
                className="w-full h-[350px] object-cover rounded-3xl border-4 border-pink-500 bg-black shadow-2xl shadow-pink-500/30"
              />

              <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-full text-white">
                Candidate
              </div>
            </div>
          </div>

          {/* WAITING */}
          {!connected && (
            <div className="mt-8 text-zinc-400 animate-pulse">
              Waiting for another user
              to join...
            </div>
          )}

          {/* CONTROLS */}
          <div className="mt-10 flex gap-5 bg-white/10 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full shadow-2xl">

            {/* MUTE */}
            <button
              onClick={() => {
                if (!stream) return;

                const audioTrack =
                  stream.getAudioTracks()[0];

                if (audioTrack) {
                  audioTrack.enabled =
                    !audioTrack.enabled;

                  setIsMuted(
                    !audioTrack.enabled
                  );
                }
              }}
              className={`px-5 py-3 rounded-full font-semibold transition ${
                isMuted
                  ? "bg-red-500 text-white"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              {isMuted
                ? "🔇 Unmute"
                : "🎤 Mute"}
            </button>

            {/* CAMERA */}
            <button
              onClick={() => {
                if (!stream) return;

                const videoTrack =
                  stream.getVideoTracks()[0];

                if (videoTrack) {
                  videoTrack.enabled =
                    !videoTrack.enabled;

                  setIsCameraOff(
                    !videoTrack.enabled
                  );
                }
              }}
              className={`px-5 py-3 rounded-full font-semibold transition ${
                isCameraOff
                  ? "bg-yellow-500 text-black"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              {isCameraOff
                ? "📷 Turn On"
                : "🎥 Camera"}
            </button>

            {/* LEAVE */}
            <button
              onClick={leaveCall}
              className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold transition"
            >
              ❌ Leave
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoCall;