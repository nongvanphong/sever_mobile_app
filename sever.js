// improt thư vien mình vùa cài đặt
var sql = require("mssql/msnodesqlv8");

// caauss hình  để dâng nhap
var config = {
  //server: "192.168.1.13",
  //server: "192.168.127.162",
  server: "192.168.1.104",
  user: "sa",
  password: "123456",
  database: "DB_APP",
  driver: "msnodesqlv8",
};

// thực hiện kết nối
const conn = new sql.ConnectionPool(config).connect().then((pool) => {
  return pool;
});

module.exports = {
  conn: conn,
  sql: sql,
};
