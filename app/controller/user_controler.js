const { conn, sql } = require("../../sever");
const path = require("path");
const fs = require("fs");

exports.getdatauser = (io, socket) => {
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
};
