import { useRef, useState, useEffect } from "react";
import { X, Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import UserIcon from "./User_Icon.png";
import Peer from "peerjs";

const VideoCallPopup = ({ isOpen, onClose, callType = "outgoing" }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const { authUser } = useAuthStore();
  // console.log(authUser);
  
  
  const {
    selectedUser,
    call,
    isReceivingCall,
    acceptCall,
    endCall
  } = useChatStore();
  // console.log(selectedUser);
  

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const callRef = useRef(null);
  const streamRef = useRef(null);

  // useEffect(() => {
  //   if (!isOpen) return;

  //   const peer = new Peer(selectedUser._id);
  //   peerRef.current = peer;

  //   peer.on("open", (id) => {
  //     console.log("My Peer ID:", id);
  //   });

  //   navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
  //     streamRef.current = stream;
  //     if (localVideoRef.current) {
  //       localVideoRef.current.srcObject = stream;
  //     }

  //     if (callType === "outgoing" && selectedUser) {
  //       const outgoingCall = peer.call(call?.peerId, stream);
  //       callRef.current = outgoingCall;

  //       outgoingCall.on("stream", (remoteStream) => {
  //         if (remoteVideoRef.current) {
  //           remoteVideoRef.current.srcObject = remoteStream;
  //         }
  //       });
  //     }
  //   });

  //   peer.on("call", (incomingCall) => {
  //     if (!isReceivingCall) return;
  //     acceptCall();

  //     incomingCall.answer(streamRef.current);
  //     incomingCall.on("stream", (remoteStream) => {
  //       if (remoteVideoRef.current) {
  //         remoteVideoRef.current.srcObject = remoteStream;
  //       }
  //     });

  //     callRef.current = incomingCall;
  //   });

  //   return () => {
  //     peer.destroy();
  //     streamRef.current?.getTracks().forEach((track) => track.stop());
  //   };
  // }, [isOpen, callType, selectedUser, isReceivingCall]);

  useEffect(() => {
    if (!isOpen) return;
  
    const peer = new Peer(authUser._id);
    peerRef.current = peer;
  
    peer.on("open", (id) => {
      console.log("My Peer ID:", id);
    });
  
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      streamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
  
      if (callType === "outgoing" && selectedUser) {
        // Make an outgoing call
        const outgoingCall = peer.call(call?.peerId, stream);
        callRef.current = outgoingCall;
  
        outgoingCall.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
      }
  
      // Answer incoming call
      peer.on("call", (incomingCall) => {
        if (!isReceivingCall) return;
        acceptCall();
  
        incomingCall.answer(stream);
        incomingCall.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
  
        callRef.current = incomingCall;
      });
    });
  
    return () => {
      peer.destroy();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [isOpen, callType, selectedUser, isReceivingCall]);
  

  const handleEndCall = () => {
    callRef.current?.close();
    endCall();
    onClose();
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    streamRef.current?.getAudioTracks().forEach((track) => (track.enabled = isMuted));
  };

  const toggleVideo = () => {
    setIsVideoOff((prev) => !prev);
    streamRef.current?.getVideoTracks().forEach((track) => (track.enabled = !isVideoOff));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--color-bg)] rounded-lg shadow-lg w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-text)]">
          <h3 className="font-semibold text-lg text-[var(--color-text)]">
            {callType === "outgoing" ? "Calling..." : "Incoming Call"}
          </h3>
          <button
            onClick={handleEndCall}
            className="p-2 rounded-full hover:bg-[var(--color-hover)]"
            aria-label="Close Video Call"
          >
            <X size={20} className="text-[var(--color-text)]" />
          </button>
        </div>

        {/* Video Container */}
        <div className="relative bg-gray-800 w-full aspect-video">
          {/* Remote Video */}
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />

          {/* Placeholder when video is off */}
          {isVideoOff && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
              <img
                src={selectedUser?.profilePic || UserIcon}
                alt={selectedUser?.fullName}
                className="w-24 h-24 rounded-full border-2 border-white"
              />
              <p className="text-white mt-2">{selectedUser?.fullName}</p>
            </div>
          )}

          {/* Small Self-View */}
          <div className="absolute bottom-4 right-4 w-32 h-24 rounded-lg border border-white overflow-hidden">
            <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6 p-4">
        {callType === "incoming" && isReceivingCall && (
    <button
      onClick={acceptCall}
      className="p-4 rounded-full bg-green-600 text-white hover:bg-green-700"
      aria-label="Accept Call"
    >
      Accept
    </button>
  )}
          <button
            onClick={toggleMute}
            className={`p-3 rounded-full ${isMuted ? "bg-red-500" : "bg-gray-600"} text-white hover:opacity-90`}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button
            onClick={handleEndCall}
            className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700"
            aria-label="End Call"
          >
            <PhoneOff size={24} />
          </button>

          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full ${isVideoOff ? "bg-red-500" : "bg-gray-600"} text-white hover:opacity-90`}
            aria-label={isVideoOff ? "Turn Video On" : "Turn Video Off"}
          >
            {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallPopup;
