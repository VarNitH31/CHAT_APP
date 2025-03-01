"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = [];
wss.on("connection", (socket) => {
    userCount = userCount + 1;
    console.log(`user connected  #${userCount} `);
    socket.on("message", (message) => {
        // console.log("message recieved "+message.toString()+" from user");
        // // socket.send(`${message.toString()} sent from the server `)
        // allSockets.forEach((s)=>{
        //     s.send(message.toString()+":sent from the server")
        // })
        //@ts-ignore
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId,
                userName: parsedMessage.payload.userName
            });
            console.log(`${parsedMessage.payload.roomId}`);
        }
        if (parsedMessage.type === "chat") {
            // const currentUSerRoom=allSockets.find((x)=>x.socket == socket).room
            let currentUserRoom = null;
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].socket == socket) {
                    currentUserRoom = allSockets[i].room;
                }
            }
            for (let i = 0; i < allSockets.length; i++) {
                if (currentUserRoom == allSockets[i].room) {
                    // allSockets[i].socket.send(`${parsedMessage.payload}`)
                    allSockets[i].socket.send(JSON.stringify({
                        message: parsedMessage.payload.message,
                        userName: parsedMessage.payload.userName
                    }));
                }
            }
        }
    });
    // allSockets.push(socket);
    socket.on("disconnect", (ds) => {
        allSockets = allSockets.filter((s) => { s !== ds; });
    });
});
