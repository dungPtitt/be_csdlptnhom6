import slTonKhoService from "../service/slTonKhoService";

let getSLTonKho = async(req, res)=>{
  try{
    let idSLTonKho = req.query.id;
    let response = await slTonKhoService.handleGetSLTonKho(idSLTonKho);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}
let createSLTonKho = async(req, res)=>{
  try{
    let data = req.body;
    let response = await slTonKhoService.handleCreateSLTonKho(data);
    return res.status(200).json(response);
  }catch(e){
    console.log("Err",e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

module.exports = {
  getSLTonKho,
  createSLTonKho
}