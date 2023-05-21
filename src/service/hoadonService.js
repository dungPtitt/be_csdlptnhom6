import {connect, sql} from "../util/connectDB";
import {configDB} from "../util/configDB";

let handleCreateHoaDon = (data)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      console.log("check data", data);
      if(!data.MAHD || !data.MAKHO || !data.MANV || !data.TENKH || !data.DIACHI ||!data.SDT||!data.NGAY ||!data.TONGTIEN){
        return resolve({
          errCode: 1,
          errMessage: "Missing input data",
        })
      }

      let  pool = await  sql.connect(configDB);
      let res = await  pool.request()
      .input('input_parameter', data.MAHD)
      .query("SELECT * from HOADON where MAHD = @input_parameter");
      if(res.recordset.length!==0){
        return resolve({
          errCode: 2,
          errMessage: "Ma hoa don da ton tai trong db!",
        })
      }
      if(!data.MAHD.includes("HD", 0)){
        return resolve({
          errCode: 2,
          errMessage: "Ma hoa don phai co dang HD!",
        })
      }
      // pool = await  sql.connect(configDB);
      res = await  pool.request()
      .input('MAHD', data.MAHD)
      .input('MAKHO', data.MAKHO)
      .input('MANV', data.MANV)
      .input('TENKH', data.TENKH)
      .input('DIACHI', data.DIACHI)
      .input('SDT', data.SDT)
      .input('NGAY', data.NGAY)
      .input('TONGTIEN', data.TONGTIEN)
      .execute('sp_create_hoadon');
      return resolve({
        errCode: 0,
        message: "Create hoadon successfully!",
        data: res.recordset
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleGetHoaDon = (idHoaDon)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let data="";
      if(!idHoaDon) {
        let  pool = await  sql.connect(configDB);
        data = await  pool.request().query("SELECT * from HOADON");
      }else {
        let  pool = await  sql.connect(configDB);
        data = await  pool.request()
        .input('input_parameter', idHoaDon)
        .query("SELECT * from HOADON where MAHD = @input_parameter");
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

let handleUpdateHoaDon = (data)=>{
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
      .input('MAHD', data.MAHD)
      .input('MAKHO', data.MAKHO)
      .input('MANV', data.MANV)
      .input('TENKH', data.TENKH)
      .input('DIACHI', data.DIACHI)
      .input('SDT', data.SDT)
      .input('NGAY', data.NGAY)
      .input('TONGTIEN', data.TONGTIEN)
      .execute('sp_update_hoadon');
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

let handleDeleteHoaDon = (idHoaDon)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idHoaDon){
        return resolve({
          errCode: 1,
          errMessage: "Missing input data",
        })
      }
      
      let  pool = await  sql.connect(configDB);
      let data = await  pool.request()
      .input('input_parameter', idHoaDon)
      .query("DELETE FROM HOADON where MAHD = @input_parameter");
      return resolve({
        errCode: 0,
        message: "Delete hoa don successfully!",
      })
    }catch(e){
      reject(e);
    }
  })
}


module.exports = {
  handleGetHoaDon,
  handleUpdateHoaDon,
  handleCreateHoaDon,
  handleDeleteHoaDon
}