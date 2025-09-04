// Realtime disabled build: return a dummy socket with no-op on/off.
let socket = null;
export const getSocket = () => {
  if (!socket) {
    socket = { on: () => {}, off: () => {} };
  }
  return socket;
};
