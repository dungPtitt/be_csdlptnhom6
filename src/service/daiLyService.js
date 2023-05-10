import {connect, sql} from "../util/connectDB";
import {configDB} from "../util/configDB";

let handleGetDaiLy = (idChiNhanh)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let chinhanh="";
      connect
        .then((pool)=>{
          if(!idChiNhanh){
            pool.request().query("SELECT * FROM CHINHANH", (err, data)=>{
              if(err){
                console.log("err------------->", err);
                return;
              }
              return resolve({
                errCode: 0,
                message: "Get all Pet successfully!",
                data: data.recordset
              })
            })
          }else{
            pool.request().query(`SELECT * FROM CHINHANH WHERE MACN=${idChiNhanh}`, (err, data)=>{
              if(err){
                console.log("err------------->", err);
                return;
              }
              return resolve({
                errCode: 0,
                message: "Get all Pet successfully!",
                data: data.recordset
              })
            })
          }
          
        })
        .catch();
      
    }catch(e){
      reject(e);
    }
  })
}


module.exports = {
  handleGetDaiLy,
}