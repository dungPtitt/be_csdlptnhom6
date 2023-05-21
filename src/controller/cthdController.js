import cthdService from "../service/cthdService"; 

let createCTHD = async(req, res)=>{
  try{
    let data = req.body;
    let response = await cthdService.handleCreateCTHD(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let getCTHD = async(req, res)=>{
  try{
    let idCTHD = req.query.id;
    let response = await cthdService.handleGetCTHD(idCTHD);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let updateCTHD = async(req, res)=>{
  try{
    let data = req.body;
    let response = await cthdService.handleUpdateCTHD(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let deleteCTHD = async(req, res)=>{
  try{
    let idCTHD= req.query.id;
    let response = await cthdService.handleDeleteCTHD(idCTHD);
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
  createCTHD,
  getCTHD,
  updateCTHD,
  deleteCTHD
}