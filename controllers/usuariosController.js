const Usuarios = require("../models/Usuarios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registrarUsuario = async (req, res, next) => {
  //Leer los datos del usuario y colocarlos en la tabla USUARIOS
  const usuario = new Usuarios(req.body);
  //   console.log("Usuario", usuarios);
  usuario.password = await bcrypt.hash(req.body.password, 12);

  try {
    await usuario.save();
    res.json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error" });
    next();
  }
};

exports.autenticarUsuario = async (req, res, next) => {
  const { email, password } = req.body;

  //BUSCAR EL USUARIO
  const usuario = await Usuarios.findOne({ email });

  if (!usuario) {
    //SI EL USUARIO NO EXISTE
    await res.status(401).json({ mensaje: "El usuario no existe" });
    return next();
  } else {
    //SI EL USUARIO EXISTE, VERIFICA SI EL PASSWORD ES CORRECTO
    // console.log("El usuario existe");

    if (!bcrypt.compareSync(password, usuario.password)) {
      //SI EL PASSWORD ES INCORRECTO
      await res.status(401).json({ message: "Password incorrecto" });
      next();
    } else {
      // PASSWORD CORRECTO, FIRMAR TOKEN
      const token = jwt.sign(
        {
          email: usuario.email,
          nombre: usuario.nombre,
          id: usuario._id,
        },
        "LLAVESECRETA",
        {
          expiresIn: "1h",
        }
      );
      //RETORNAR EL TOKEN
      res.json({ token });
    }
  }
};
