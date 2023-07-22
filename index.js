const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "variables.env" });

//CORS PERMITE QUE UN CLIENTE SE CONECTE A OTRO SERVIDOR PARA EL INTERCAMBIO DE RECURSOS
const cors = require("cors");

//CONECTAR MONGOSEE
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});
// mongoose.connect(process.env.MONGO_DB_URL);
//CREAR EL SERVIDOR
const app = express();

//HABILITAR BODY PARSER
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//HABILITAR CORS
app.use(cors());

//Rutas de la app
app.use("/", routes());

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 6000;

//PUERTO - INICIAR APP
app.listen(port, host, () => {
  console.log("El servidor esta funcionando en el puerto: ", port);
});
