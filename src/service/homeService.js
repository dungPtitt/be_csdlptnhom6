import {connect, sql} from "../util/connectDB";
let configDB = {
  server: "T480S\\CSDLPTNHOM6",
  port: 1433,
  user: "sa",
  password: "123456",
  database: "CHINHANH2",
  driver: "msnodesqlv8",
}

let handleGetHomePage = (idChiNhanh)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let data;
      connect
        .then((pool)=>{
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
        })
        .catch();
      // return resolve({
      //   errCode: 0,
      //   message: "Get all Pet successfully!",
      //   data: configDB
      // })
      // if(!idChiNhanh){
      //   let pets = (await connect).request().query("SELECT * FROM CHINHANH");
      //   console.log(pets);
      //   resolve({
      //     errCode: 0,
      //     message: "Get all Pet successfully!",
      //   })
      // }
      // let pet = await db.Pet.findOne({
      //   where: {id: idPet},
      //   raw: true
      // });
      // if(!pet){
      //   resolve({
      //     errCode: 2,
      //     message: "Pet not exist",
      //   })
      // }
      // resolve({
      //   errCode: 0,
      //   message: "Get Pet successfully!",
      //   data: pet
      // })
    }catch(e){
      reject(e);
    }
  })
}


module.exports = {
  handleGetHomePage,
}