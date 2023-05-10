import nhanVienService from "../service/nhanVienService"; 

let getDaiLy = async(req, res)=>{
  try{
    let idDayLy = req.query.idDaiLy;
    let response = await daiLyService.handleGetDaiLy(idDayLy);
    // console.log(response);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let createNhanVien = async(req, res)=>{
  try{
    let data = req.body;
    let response = await nhanVienService.handleCreateNhanVien(data);
    // console.log(response);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let getNhanVien = async(req, res)=>{
  try{
    let idNhanVien = req.query.id;
    let response = await nhanVienService.handleGetNhanVien(idNhanVien);
    // console.log(response);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let updateNhanVien = async(req, res)=>{
  try{
    let data = req.body;
    let response = await nhanVienService.handleUpdateNhanVien(data);
    // console.log(response);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let deleteNhanVien = async(req, res)=>{
  try{
    let idNhanVien= req.query.id;
    let response = await nhanVienService.handleDeleteNhanVien(idNhanVien);
    // console.log(response);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}


module.exports = {
  getDaiLy,
  createNhanVien,
  getNhanVien,
  updateNhanVien,
  deleteNhanVien
}