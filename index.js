const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//CONECTAR MONGOSEE
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/resapis", {
  useNewUrlParser: true,
});

//CREAR EL SERVIDOR
const app = express();

//HABILITAR BODY PARSER
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Rutas de la app
app.use("/", routes());

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5000;

//PUERTO - INICIAR APP
app.listen(port, host, () => {
  console.log("El servidor esta funcionando");
});
