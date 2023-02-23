const { conn, sql } = require("../../sever");

module.exports=class Usre(){
    this.getdataussre= async function(call_back){
        var pool = await conn;
        var sqlquery = "select *from Users where gamiluser=@gmail and passuser=@pass";
      
        return await pool
          .request()
          .input("gmail", sql.VarChar, gmail)
          .input("pass", sql.VarChar, pass)
          .query(sqlquery, function (err, data) {
            if (data.recordset.length > 0) {
             call_back({ data: data.recordset[0] });
            } else {
              call_back({ data: null });
            }
          });
    }
}