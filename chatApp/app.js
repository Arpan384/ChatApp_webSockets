const express= require("express");
const socket=require("socket.io");
const app=express();
var server=app.listen(1234,()=>{
    console.log("server start @ 1234");
});
app.use(express.static("public"));

var io=socket(server);

io.sockets.on("connection",(socket)=>{
    console.log("socket connected",socket.id);

    socket.on("chat",(data)=>{
        io.sockets.emit("rec",data);
    });
    socket.on("typing",(data)=>{
        socket.broadcast.emit("type",data);
    });
});