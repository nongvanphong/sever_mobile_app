// improt thư vien mình vùa cài đặt
var sql = require("mssql/msnodesqlv8");

// caauss hình  để dâng nhap
var config = {
  //server: "192.168.1.13",
  //server: "192.168.127.162",
  server: "192.168.1.7,1435",
  user: "sa",
  password: "123456",
  database: "DB_APP1",
  driver: "msnodesqlv8",
  // options: {
  //   encrypt: true, // for azure
  //   trustServerCertificate: false, // change to true for local dev / self-signed certs
  // },
};

// thực hiện kết nối
// const conn = new sql.ConnectionPool(config).connect().then((pool) => {
//   return pool;
// });
const conn = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.log("Error connecting to SQL Server", err);
  });
module.exports = {
  conn: conn,
  sql: sql,
};
