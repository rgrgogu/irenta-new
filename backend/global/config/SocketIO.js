// import Server from "socket.io".Server; need mo to iimport
import http from http

// const Server = require("socket.io").Server;

const SocketIO = (app) => {
    const server = http.createServer(app);
    const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            // origin: [
            //     "sample url"
            // ],
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("Connected to Socket.io");

        socket.on("setup", (userData) => {
            socket.join(userData._id);
            socket.emit("connected");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from Socket.io");
        });

        // SENDING EVENT APPLICATIONS
        socket.on("send-event-appli", (obj) => {
            io.emit("receive-event-appli", obj);
        });
    });

    return server;
};

export default SocketIO;