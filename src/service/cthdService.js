import {connect, sql} from "../util/connectDB";
import {configDB} from "../util/configDB";

let handleCreateCTHD = (data)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!data.MAHD||!data.MASP || !data.SL){
        return resolve({
          errCode: 1,
          errMessage: "Missing input data",
        })
      }
      data.GIA = 0;
      let  pool = await  sql.connect(configDB);
      let res = await  pool.request()
      .input('MAHD', data.MAHD)
      .input('MASP', data.MASP)
      .query("SELECT * from CTHD where MASP = @MASP and MAHD = @MAHD");
      if(res.recordset.length!==0){
        return resolve({
          errCode: 2,
          errMessage: "Da co chi tiet hoa don cho san pham nay!",
        })
      }
      if(data.SL <= 0){
        return resolve({
          errCode: 2,
          errMessage: "SL phai lon hon 0",
        })
      }
      // pool = await  sql.connect(configDB);
      res = await  pool.request()
      .input('MAHD', data.MAHD)
      .input('MASP', data.MASP)
      .input('SL', data.SL)
      .input('GIA', data.GIA)
      .execute('sp_create_cthd');
      return resolve({
        errCode: 0,
        message: "Tao chi tiet cho hoa don cho hoa don thanh cong!",
        data: res.recordset
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleGetCTHD = (idCTHD)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let data="";
      if(!idCTHD) {
        let  pool = await  sql.connect(configDB);
        data = await  pool.request().query("SELECT * from CTHD");
      }else {
        let  pool = await  sql.connect(configDB);
        data = await  pool.request()
        .input('input_parameter', idCTHD)
        .query("SELECT * from CTHD where MAHD = @input_parameter");
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

let handleUpdateCTHD = (data)=>{
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

let handleDeleteCTHD = (idCTHD)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idCTHD){
        return resolve({
          errCode: 1,
          errMessage: "Missing input data",
        })
      }
      
      let  pool = await  sql.connect(configDB);
      let data = await  pool.request()
      .input('input_parameter', idCTHD)
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
  handleGetCTHD,
  handleUpdateCTHD,
  handleCreateCTHD,
  handleDeleteCTHD
}