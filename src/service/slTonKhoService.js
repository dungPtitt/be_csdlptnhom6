import {connect, sql} from "../util/connectDB";
import {configDB} from "../util/configDB";

let handleGetSLTonKho = (idSLTonKho)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let data="";
      if(!idSLTonKho) {
        let  pool = await  sql.connect(configDB);
        data = await  pool.request().query("SELECT * from SLTONKHO");
      }else {
        let  pool = await  sql.connect(configDB);
        data = await  pool.request()
        .input('input_parameter', idSLTonKho)
        .query("SELECT * from SLTONKHO where MASP = @input_parameter");
      }
      return resolve({
        errCode: 0,
        message: "Get all so luong ton kho successfully!",
        data: data.recordset
      })

      
    }catch(e){
      reject(e);
    }
  })
}

let handleCreateSLTonKho = (data)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      console.log(data);
      if(!data.MASP || !data.MAKHO || !data.SL){
        return resolve({
          errCode: 1,
          errMessage: "Missing input data",
        })
      }

      let  pool = await  sql.connect(configDB);
      let res = await  pool.request()
      .input('MASP', data.MASP)
      .input('MAKHO', data.MAKHO)
      .query("SELECT * from SLTONKHO where MASP = @MASP and MAKHO = @MAKHO");
      if(res.recordset.length!==0){
        return resolve({
          errCode: 2,
          errMessage: "So luong san pham trong kho da duoc cap nhat!",
        })
      }
      res = await  pool.request()
      .input('MASP', data.MASP)
      .input('MAKHO', data.MAKHO)
      .input('SL', data.SL)
      .execute('sp_create_sltonkho');
      return resolve({
        errCode: 0,
        message: "Create sltonkho successfully!",
        data: res.recordset
      })
    }catch(e){
      reject(e);
    }
  })
}

module.exports = {
  handleGetSLTonKho,
  handleCreateSLTonKho,
}