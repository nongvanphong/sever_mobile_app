var express = require("express");
const socketIO = require("socket.io");
const http = require("http");
var app = express();

// gọi body parser
var bodyparsert = require("body-parser");
// sử dụng body parser

//app.use(bodyparsert.json());
app.use(bodyparsert.json({ limit: "50mb", extended: true }));
app.use(
  bodyparsert.urlencoded({
    limit: "50mb",

    extended: true,
  })
);
let size = http.maxHeaderSize;
console.log("Max HTTP Header size is", size);

// kết nôi với soket io
const server = http.createServer(app);
const io = socketIO(server);

// //chuyenr ảnh ra đường dẫn

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/htm.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("stream", (stream) => {
    console.log("kkk", stream);
    //socket.broadcast.emit("stream", stream);
    io.emit("stream", stream);
  });

  socket.on("disconnect", () => {
    //console.log("user disconnected");
    socket.broadcast.emit("callEnded");
  });
});

//======================================
// gọi biến roter từ modun ruter
require("./app/router/user")(app, io);

//////////////-------------------------------------
// gọi cổng sever
server.listen(3000, function () {
  // đường daanc :3000 mói có thể sử dụng
  console.log("http://192.168.1.104:3000");
});
//============= cài đặt modun==============
// cài dăt node js
// npm init -y hoặc là npm init
// npm i express
// npm i body-parser --save
//real time
// npm install socket.io --save
// socket.io/socket.io.js

// tự dộng chạy sever
//npm i nodemon -g

//============ kết nói sql==============
// mssql
//msnodesqlv8
