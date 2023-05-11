import express from "express";
import apiController from "../controller/apiController";
import khoController from "../controller/khoController";
let router = express.Router()

const initApiRoute = (app)=> {
  // router.get("/", homeController.getHomePage);
  router.get("/get-chinhanh", apiController.getDaiLy);
  router.post("/create-nhanvien", apiController.createNhanVien);
  router.get("/get-nhanvien", apiController.getNhanVien);
  router.put("/update-nhanvien", apiController.updateNhanVien);
  router.delete("/delete-nhanvien", apiController.deleteNhanVien);

  router.get("/get-kho", khoController.getKho);
  return app.use("/api/v1/", router);
}

export default initApiRoute;