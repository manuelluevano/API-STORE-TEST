const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //AUTORIZACION POR EL HEADER
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Invalid authorization header");
    error.statusCode = 401;
    throw error;
  }

  //OBTENER EL TOKEN  Y VERIFICARLO
  const token = authHeader.split(" ")[1];
  let revisarToken;
  try {
    revisarToken = jwt.verify(token, "LLAVESECRETA");
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  //SI ES UN TOKEN VALIDO, PERO HAY ALGUN ERROR (COMO EXPIRADO)
  if (!revisarToken) {
    const error = new Error("No authorization token");
    error.statusCode = 401;
    throw error;
  }
  next();
};
