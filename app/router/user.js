// cái dòng này có tác dụng sẽ tách k=dữ liệu từ api thành dạng hàn
const { conn, sql } = require("../../sever");
module.exports = function (app, io) {
  var usrecontroller = require("../controller/user_controler");

  io.on("connection", (socket) => {
    usrecontroller.getdatauser(io, socket);
  });
};
