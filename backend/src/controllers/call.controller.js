import { io, getReceiverSocketId } from "../lib/socket.js";

export const initiateCall = async (req, res) => {
    try {
        const { peerId } = req.body; // Get PeerJS ID from frontend
        const { id: receiverId } = req.params;
        const callerId = req.user._id;

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("incomingCall", { callerId, peerId });
        }

        res.status(200).json({ message: "Call initiated" });
    } catch (error) {
        console.log("Error in initiateCall controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const endCall = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const callerId = req.user._id;

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("callEnded");
        }

        res.status(200).json({ message: "Call ended" });
    } catch (error) {
        console.log("Error in endCall controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
