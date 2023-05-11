const sql = require("mssql/msnodesqlv8");
import {configDB} from "./configDB";

const connect = new sql.ConnectionPool(configDB).connect();
module.exports = {
  sql,
  connect,
}