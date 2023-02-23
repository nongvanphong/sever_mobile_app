const { conn, sql } = require("../../sever");
const path = require("path");
const fs = require("fs");

var today = new Date();
exports.inser_status = async (req, res) => {
  let id = req.body.iduser;
  let t = req.body.txt;
  let i = req.body.img;

  let img = null;
  let txt = null;
  if (i !== "") {
    const base64Image = "data:image/jpg;base64," + i;
    const binaryData = Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    let ngay =
      today.getDate() + "" + (today.getMonth() + 1) + "" + today.getFullYear();
    let time =
      today.getHours() +
      "" +
      today.getMinutes() +
      "" +
      today.getSeconds() +
      "" +
      today.getMilliseconds();
    let truocngay = Math.floor(Math.random() * 100000);
    let truocsaungay = Math.floor(Math.random() * 100000);
    let truocsaugio = Math.floor(Math.random() * 100000);
    let tenanh =
      truocngay +
      "" +
      ngay +
      "" +
      truocsaungay +
      "" +
      time +
      "" +
      truocsaugio +
      ".jpg";
    img = tenanh;
    //==========================

    fs.writeFileSync(
      //quản lí đường dẫn

      path.join(__dirname + "/public/imgmain", tenanh),
      binaryData,
      function (err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file was saved!");
      }
    );
  }

  if (t !== "") {
    txt = t;
  }

  let date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes();
  ":" + today.getSeconds();

  var pool = await conn;
  var sqlquery =
    "INSERT INTO bantin (  iduser,thoigiandang,noidungdang,hinhanh) VALUES ( @id, @date,@txt,@img)";
  return await pool
    .request()
    .input("id", sql.Int, id)
    .input("txt", sql.VarChar, txt)
    .input("img", sql.VarChar, img)

    .input("date", sql.DateTime, date)
    .query(sqlquery, function (err, data) {
      console.log(err + "thanh công");
      res.send({ message: "Data was inserted successfully" });
    });
};
// getdata satuse
exports.my_getdata = async (req, res) => {
  let id = req.body.id;
  console.log(id);
  //chỏ đến seve
  let pool = await conn;
  let sqlquery =
    "select users.iduser,users.nameuser,users.avatar,bantin.idbantin,bantin.thoigiandang,bantin.noidungdang,bantin.hinhanh from users,bantin where  bantin.iduser=users.iduser and users.iduser=@id ORDER BY bantin.thoigiandang DESC";
  return await pool
    .request()
    .input("id", sql.Int, id)
    .query(sqlquery, function (err, data) {
      // console.log(err, data.recordsets.sta);
      if (data.recordset.length > 0) {
        res.send({ data: data.recordset });
      } else {
        res.send({ data: null });
      }
    });
};
// update
exports.update_starus_profile = async (req, res) => {
  let id = req.body.idbantin;
  let txt = req.body.txt;
  let img = req.body.img;
  console.log("===========", txt);
  if (req.body.txt === "") {
    txt = null;
  }
  //chỏ đến seve
  let pool1 = await conn;
  let sqlquery1 =
    "select bantin.hinhanh from bantin where  bantin.idbantin=@id";
  return await pool1
    .request()
    .input("id", sql.Int, id)
    .query(sqlquery1, function (err, data) {
      if (data.recordset.length > 0) {
        if (img !== "") {
          let a = data.recordsets[0];
          console.log(a[0].hinhanh);
          if (a[0].hinhanh != null) {
            fs.unlink(__dirname + "/public/imgmain/" + a[0].hinhanh, (err) => {
              res.send({ data: "OK" });
              update(id, txt, img);
              if (err) throw err;
            });
          } else {
            update(id, txt, img);
          }
        } else {
          console.log("--------------");
          update1(id, txt, img);
        }
      } else {
        res.send({ data: null });
      }
    });
};
exports.delete = async (req, res) => {
  console.log("delete");
  let id = req.body.idbantin;

  //chỏ đến seve
  let pool1 = await conn;
  let sqlquery1 =
    "select bantin.hinhanh from bantin where  bantin.idbantin=@id";
  return await pool1
    .request()
    .input("id", sql.Int, id)
    .query(sqlquery1, function (err, data) {
      // console.log(err, data.recordsets.sta);
      if (data.recordset.length > 0) {
        //res.send({ data: data.recordset[0] });
        let a = data.recordsets[0];
        console.log(a[0].hinhanh);
        if (a[0].hinhanh === null) {
          xoa(id);
        } else {
          fs.unlink(__dirname + "/public/imgmain/" + a[0].hinhanh, (err) => {
            xoa(id);
            res.send({ data: "OK" });
            if (err) throw err;
          });
        }
      } else {
        res.send({ data: null });
      }
    });
};
const xoa = async (id) => {
  //chỏ đến seve
  let pool = await conn;
  let sqlquery = "delete bantin where bantin.idbantin=@id";
  return await pool
    .request()
    .input("id", sql.Int, id)
    .query(sqlquery, function (err, data) {
      // console.log(err, data.recordsets.sta);
      if (err) {
      } else {
      }
    });
};
const update = async (id, txt, i) => {
  // let id = req.body.idbantin;
  // let txt = req.body.txt;
  // let i = req.body.img;
  let img = null;
  if (i !== "") {
    const base64Image = "data:image/jpg;base64," + i;
    const binaryData = Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    let ngay =
      today.getDate() + "" + (today.getMonth() + 1) + "" + today.getFullYear();
    let time =
      today.getHours() +
      "" +
      today.getMinutes() +
      "" +
      today.getSeconds() +
      "" +
      today.getMilliseconds();
    let truocngay = Math.floor(Math.random() * 100000);
    let truocsaungay = Math.floor(Math.random() * 100000);
    let truocsaugio = Math.floor(Math.random() * 100000);
    let tenanh =
      truocngay +
      "" +
      ngay +
      "" +
      truocsaungay +
      "" +
      time +
      "" +
      truocsaugio +
      ".jpg";
    img = tenanh;
    //==========================

    fs.writeFileSync(
      //quản lí đường dẫn

      path.join(__dirname + "/public/imgmain", tenanh),
      binaryData,
      function (err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file was saved!");
      }
    );
  }

  //chỏ đến seve
  let pool = await conn;
  let sqlquery =
    "UPDATE bantin SET noidungdang = @txt, hinhanh = @img WHERE bantin.idbantin=@id";

  return await pool
    .request()
    .input("id", sql.Int, id)
    .input("txt", sql.NVarChar(sql.MAX), txt)
    .input("img", sql.VarChar, img)
    .query(sqlquery, function (err, data) {
      // console.log(err, data.recordsets.sta);
      if (err) {
        console.log("---------------------------", err.message);
      } else {
        // res.send({ data: data.recordset });
        console.log("---------------------------", img);
      }
    });
};
const update1 = async (id, txt, i) => {
  //chỏ đến seve
  let pool = await conn;
  let sqlquery =
    "UPDATE bantin SET noidungdang = @txt WHERE bantin.idbantin=@id";

  return await pool
    .request()
    .input("id", sql.Int, id)
    .input("txt", sql.VarChar, txt)

    .query(sqlquery, function (err, data) {
      // console.log(err, data.recordsets.sta);
      if (err) {
        console.log("---------------------------", err.message);
      } else {
        // res.send({ data: data.recordset });
        console.log("---------------------------", i);
      }
    });
};
