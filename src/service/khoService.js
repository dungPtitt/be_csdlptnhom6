import {connect, sql} from "../util/connectDB";
import {configDB} from "../util/configDB";

let handleCreateKho = (data)=>{
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
      .query("SELECT * from KHO where MANV = @input_parameter");
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
      .execute('sp_create_kho');
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

let handleGetKho = (idKho)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let data="";
      if(!idKho) {
        let  pool = await  sql.connect(configDB);
        data = await  pool.request().query("SELECT * from KHO");
      }else {
        let  pool = await  sql.connect(configDB);
        console.log(idKho);
        data = await  pool.request()
        .input('input_parameter', idKho)
        .query("SELECT * from KHO where MAKHO = @input_parameter");
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

let handleUpdateKho = (data)=>{
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
      .query("DELETE FROM KHO where MANV = @input_parameter");
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
  handleGetKho,
  handleUpdateKho,
  handleCreateKho,
  handleDeleteKho
}