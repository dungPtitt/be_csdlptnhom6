import {connect, sql} from "../util/connectDB";
import {configDB} from "../util/configDB";

let handleCreateNhanVien = (data)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!data.HOTEN || !data.SDT){
        return resolve({
          errCode: 1,
          errMessage: "Missing input data",
        })
      }
      if(!data.MACN){
        data.MACN = "CN002"
      }
      if(!data.MANV){
        data.MANV = "NV2006"
      }
      let  pool = await  sql.connect(configDB);
      let  res = await  pool.request()
      .input('MANV', data.MANV)
      .input('HOTEN', data.HOTEN)
      .input('SDT', data.SDT)
      .input('MACN', data.MACN)
      .execute('sp_create_nhanvien');
      
      return resolve({
        errCode: 0,
        message: "Get all nhan vien successfully!",
        data: res.recordset
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleGetNhanVien = (idNhanVien)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let data="";
      if(!idNhanVien) {
        let  pool = await  sql.connect(configDB);
        data = await  pool.request().query("SELECT * from NHANVIEN");
      }else {
        let  pool = await  sql.connect(configDB);
        console.log(idNhanVien);
        data = await  pool.request()
        .input('input_parameter', idNhanVien)
        .query("SELECT * from NHANVIEN where MANV = @input_parameter");
      }
      // console.log(data);
      return resolve({
        errCode: 0,
        message: "Get all Pet successfully!",
        data: data.recordset
      })

      
    }catch(e){
      reject(e);
    }
  })
}

let handleUpdateNhanVien = (data)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!data.HOTEN || !data.SDT || !data.MANV){
        return resolve({
          errCode: 1,
          errMessage: "Missing input data",
        })
      }
      if(!data.MACN){
        data.MACN = "CN002"
      }
      let  pool = await  sql.connect(configDB);
      let  res = await  pool.request()
      .input('MANV', data.MANV)
      .input('HOTEN', data.HOTEN)
      .input('SDT', data.SDT)
      .execute('sp_update_nhanvien');
      
      // console.log(data);
      return resolve({
        errCode: 0,
        message: "Get all Pet successfully!",
        data: res.recordset
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleDeleteNhanVien = (idNhanVien)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idNhanVien){
        return resolve({
          errCode: 1,
          errMessage: "Missing input data",
        })
      }
      
      let  pool = await  sql.connect(configDB);
      data = await  pool.request()
      .input('input_parameter', idNhanVien)
      .query("DELETE FROM NHANVIEN where MANV = @input_parameter");
      // DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';
      // console.log(data);
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
  handleGetNhanVien,
  handleUpdateNhanVien,
  handleCreateNhanVien,
  handleDeleteNhanVien
}