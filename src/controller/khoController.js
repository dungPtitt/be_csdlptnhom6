import khoService from "../service/khoService"; 

let createKho = async(req, res)=>{
  try{
    let data = req.body;
    let response = await khoService.handleCreateKho(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let getKho = async(req, res)=>{
  try{
    let idKho = req.query.id;
    let response = await khoService.handleGetKho(idKho);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let updateKho = async(req, res)=>{
  try{
    let data = req.body;
    let response = await khoService.handleUpdateKho(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let deleteKho = async(req, res)=>{
  try{
    let idKho= req.query.id;
    let response = await khoService.handleDeleteKho(idKho);
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
  createKho,
  getKho,
  updateKho,
  deleteKho
}