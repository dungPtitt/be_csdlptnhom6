import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
let router = express.Router()

const initApiRoute = (app)=> {
  // router.post("/create-pet", petController.createPetApi);
  // router.get("/get-pet", petController.getPetApi);
  // router.put("/update-pet", petController.updatePetApi);
  // router.delete("/delete-pet", petController.deletePetApi);
  // router.get("/find-pet", petController.findPetByNameApi);
  router.get("/", homeController.getHomePage);
  router.get("/get-chinhanh", apiController.getDaiLy);
  router.post("/create-nhanvien", apiController.createNhanVien);
  router.get("/get-nhanvien", apiController.getNhanVien);
  router.put("/update-nhanvien", apiController.updateNhanVien);
  router.delete("/delete-nhanvien", apiController.deleteNhanVien);
  return app.use("/api/v1/", router);
}

export default initApiRoute;