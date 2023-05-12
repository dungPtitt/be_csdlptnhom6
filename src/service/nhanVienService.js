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

      let  pool = await  sql.connect(configDB);
      let res = await  pool.request()
      .input('input_parameter', data.MANV)
      .query("SELECT * from NHANVIEN where MANV = @input_parameter");
      if(res.recordset.length!==0){
        return resolve({
          errCode: 2,
          errMessage: "Ma nhan vien da ton tai trong db!",
        })
      }
      if(!data.MACN) {
        data.MACN = "CN01"
      }
      if(!data.MANV.includes("NV01", 0)){
        return resolve({
          errCode: 2,
          errMessage: "Ma nhan vien phai co dang NV01!",
        })
      }
      // pool = await  sql.connect(configDB);
      res = await  pool.request()
      .input('MANV', data.MANV)
      .input('HOTEN', data.HOTEN)
      .input('SDT', data.SDT)
      .input('MACN', data.MACN)
      .input('DIACHI', data.DIACHI)
      .input('CHUCVU', data.CHUCVU)
      .input('LUONG', data.LUONG)
      .execute('sp_create_nhanvien');
      return resolve({
        errCode: 0,
        message: "Create nhan vien successfully!",
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
        data = await  pool.request()
        .input('input_parameter', idNhanVien)
        .query("SELECT * from NHANVIEN where MANV = @input_parameter");
      }
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
      if(!data.HOTEN || !data.SDT || !data.MANV ||!data.CHUCVU || !data.DIACHI ||!data.LUONG){
        return resolve({
          errCode: 1,
          errMessage: "Missing input data",
        })
      }
      let  pool = await  sql.connect(configDB);
      let  res = await  pool.request()
      .input('MANV', data.MANV)
      .input('HOTEN', data.HOTEN)
      .input('SDT', data.SDT)
      .input('DIACHI', data.DIACHI)
      .input('CHUCVU', data.CHUCVU)
      .input('LUONG', data.LUONG)
      .execute('sp_update_nhanvien');
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
      let data = await  pool.request()
      .input('input_parameter', idNhanVien)
      .query("DELETE FROM NHANVIEN where MANV = @input_parameter");
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