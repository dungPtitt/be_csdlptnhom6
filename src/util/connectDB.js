const sql = require("mssql/msnodesqlv8");
const config = {
  server: "T480S\\CSDLPTNHOM6",
  port: 1433,
  user: "sa",
  password: "123456",
  database: "CHINHANH2",
  driver: "msnodesqlv8",
}

const connect = new sql.ConnectionPool(config).connect();
module.exports = {
  sql,
  connect,
}