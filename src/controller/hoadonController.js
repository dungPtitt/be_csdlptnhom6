import hoadonService from "../service/hoadonService"; 

let createHoaDon = async(req, res)=>{
  try{
    let data = req.body;
    let response = await hoadonService.handleCreateHoaDon(data);
    return res.status(200).json(response);
  }catch(e){
    console.log("Err",e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let getHoaDon = async(req, res)=>{
  try{
    let idHoaDon = req.query.id;
    let response = await hoadonService.handleGetHoaDon(idHoaDon);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let updateHoaDon = async(req, res)=>{
  try{
    let data = req.body;
    let response = await hoadonService.handleUpdateHoaDon(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let deleteHoaDon = async(req, res)=>{
  try{
    let idHoaDon= req.query.id;
    let response = await hoadonService.handleDeleteHoaDon(idHoaDon);
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
  createHoaDon,
  getHoaDon,
  updateHoaDon,
  deleteHoaDon
}