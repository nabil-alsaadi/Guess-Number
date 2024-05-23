import io from "socket.io-client";
const ws = (io as any)();
// const ws = io('http://192.168.1.13:8080');
export default ws;
