const express = require("express");
const cors = require("cors");
import configViewEngine from "./src/config/viewEngine";
import initApiRoute from "./src/router/api";

const app = express();
const {sql, connect} = require("./src/util/connectDB");

var corsOptions = {
  origin: true,
};
// app.use(morgan("tiny"));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);

console.log(connect);
connect
  .then((pool)=>{
    // console.log(pool);
    pool.request().query("SELECT * FROM CHINHANH", (err, data)=>{
      if(err){
        console.log("err------------->", err);
        return;
      }
      console.log("Connection has been established successfully.")
      // console.log("data--------->", data);
    })
  })
  .catch();
initApiRoute(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;