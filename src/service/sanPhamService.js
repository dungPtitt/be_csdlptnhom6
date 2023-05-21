import {connect, sql} from "../util/connectDB";
import {configDB} from "../util/configDB";

let handleGetSanPham = (idSanPham)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let data="";
      if(!idSanPham) {
        let  pool = await  sql.connect(configDB);
        data = await  pool.request().query("SELECT * from SANPHAM");
      }else {
        let  pool = await  sql.connect(configDB);
        data = await  pool.request()
        .input('input_parameter', idSanPham)
        .query("SELECT * from SANPHAM where MASP = @input_parameter");
      }
      return resolve({
        errCode: 0,
        message: "Get all product successfully!",
        data: data.recordset
      })

      
    }catch(e){
      reject(e);
    }
  })
}

module.exports = {
  handleGetSanPham,
}