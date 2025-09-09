import { io } from "socket.io-client";
import { baseUrl } from "./api.service";

const token = sessionStorage.getItem("token");

const socket = io(baseUrl, {
  autoConnect: false, // jangan auto connect
  auth: { token }, // handshake pakai token
  transports: ["websocket"], // prefer websocket
});

// Connect socket manual (misalnya dipanggil setelah login)
export const connectSocket = () => {
  if (!socket.connected) socket.connect();
};

// Disconnect socket (misalnya saat logout)
export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};

// Listener helper
export const listenToUpdate = (event, callback) => {
  socket.on(event, callback);

  return () => {
    socket.off(event, callback);
  };
};

// Emit join room
export const emitJoinRoom = (roomId) => {
  socket.emit("join", { room: roomId });
};

// Global error handler
socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

socket.on("disconnect", (reason) => {
  console.warn("Socket disconnected:", reason);
});

export default socket;
