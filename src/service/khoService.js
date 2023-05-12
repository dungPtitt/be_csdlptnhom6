import {connect, sql} from "../util/connectDB";
import {configDB} from "../util/configDB";

let handleCreateKho = (data)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!data.TENKHO || !data.DIACHI){
        return resolve({
          errCode: 1,
          errMessage: "Missing input data",
        })
      }

      let  pool = await  sql.connect(configDB);
      let res = await  pool.request()
      .input('input_parameter', data.MAKHO)
      .query("SELECT * from KHO where MAKHO = @input_parameter");
      if(res.recordset.length!==0){
        return resolve({
          errCode: 2,
          errMessage: "Ma kho da ton tai trong db!",
        })
      }
      if(data.MACN!="CN01") {
        data.MACN = "CN01"
      }
      if(!data.MAKHO.includes("K01", 0)){
        return resolve({
          errCode: 2,
          errMessage: "Ma kho phai co dang K01!",
        })
      }
      // pool = await  sql.connect(configDB);
      res = await  pool.request()
      .input('MAKHO', data.MAKHO)
      .input('MACN', data.MACN)
      .input('TENKHO', data.TENKHO)
      .input('DIACHI', data.DIACHI)
      .execute('sp_create_kho');
      return resolve({
        errCode: 0,
        message: "Create kho successfully!",
        data: res.recordset
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleGetKho = (idKho)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let data="";
      if(!idKho) {
        let  pool = await  sql.connect(configDB);
        data = await  pool.request().query("SELECT * from KHO");
      }else {
        let  pool = await  sql.connect(configDB);
        data = await  pool.request()
        .input('input_parameter', idKho)
        .query("SELECT * from KHO where MAKHO = @input_parameter");
      }
      return resolve({
        errCode: 0,
        message: "Get all kho successfully!",
        data: data.recordset
      })

      
    }catch(e){
      reject(e);
    }
  })
}

let handleUpdateKho = (data)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!data.MAKHO || !data.TENKHO || !data.DIACHI){
        return resolve({
          errCode: 1,
          errMessage: "Missing input data",
        })
      }
      let  pool = await  sql.connect(configDB);
      let  res = await  pool.request()
      .input('MAKHO', data.MAKHO)
      .input('TENKHO', data.TENKHO)
      .input('DIACHI', data.DIACHI)
      .execute('sp_update_kho');
      return resolve({
        errCode: 0,
        message: "Update successfully!",
        data: res.recordset
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleDeleteKho = (idKho)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idKho){
        return resolve({
          errCode: 1,
          errMessage: "Missing input data",
        })
      }
      
      let  pool = await  sql.connect(configDB);
      let data = await  pool.request()
      .input('input_parameter', idKho)
      .query("DELETE FROM KHO where MAKHO = @input_parameter");
      return resolve({
        errCode: 0,
        message: "Delete employee successfully!",
      })
    }catch(e){
      reject(e);
    }
  })
}


module.exports = {
  handleGetKho,
  handleUpdateKho,
  handleCreateKho,
  handleDeleteKho
}