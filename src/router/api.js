import express from "express";
import apiController from "../controller/apiController";
import khoController from "../controller/khoController";
import hoadonController from "../controller/hoadonController";
import cthdController from "../controller/cthdController";
import sanPhamController from "../controller/sanPhamController";
import slTonKhoController from "../controller/slTonKhoController";
let router = express.Router()

const initApiRoute = (app)=> {
  // router.get("/", homeController.getHomePage);
  router.get("/get-chinhanh", apiController.getDaiLy);
  router.post("/create-nhanvien", apiController.createNhanVien);
  router.get("/get-nhanvien", apiController.getNhanVien);
  router.put("/update-nhanvien", apiController.updateNhanVien);
  router.delete("/delete-nhanvien", apiController.deleteNhanVien);

  router.get("/get-kho", khoController.getKho);
  router.post("/create-kho", khoController.createKho);
  router.put("/update-kho", khoController.updateKho);
  router.delete("/delete-kho", khoController.deleteKho);

  router.get("/get-hoadon", hoadonController.getHoaDon);
  router.post("/create-hoadon", hoadonController.createHoaDon);

  router.get("/get-cthd", cthdController.getCTHD);
  router.post("/create-cthd", cthdController.createCTHD);
  router.get("/get-sanpham", sanPhamController.getSanPham);
  router.get("/get-sltonkho", slTonKhoController.getSLTonKho);
  router.post("/create-sltonkho", slTonKhoController.createSLTonKho);
  return app.use("/api/v1/", router);
}

export default initApiRoute;