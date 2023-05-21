import sanPhamService from "../service/sanPhamService";

let getSanPham = async(req, res)=>{
  try{
    let idSanPham = req.query.id;
    let response = await sanPhamService.handleGetSanPham(idSanPham);
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
  getSanPham
}