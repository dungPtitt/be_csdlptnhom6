import homeService from "../service/homeService"; 

let getHomePage = async(req, res)=>{
  try{
    let response = await homeService.handleGetHomePage();
    console.log(response);
    // console.log(response);
    // return res.render("pet/pets.ejs", {data: response.data});
    return res.send("hello from home page");
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

module.exports = {
  getHomePage,
}