const Productos = require("../models/Productos");

const multer = require("multer");
const shortid = require("shortid");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato No válido"));
    }
  },
};

//PASAR LA CONFIGURACION Y EL CAMPO
const upload = multer(configuracionMulter).single("imagen");

//SUBE UN ARCHIVO`
exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error });
    }
    return next();
  });
};

//Agrega un nuevo Producto

exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);

  try {
    if (req.file.filename) {
      producto.imagen = req.file.filename;
    }
    await producto.save();
    res.json({ mensaje: "Se agrego un nuevo producto" });
  } catch (error) {
    console.log(error);
    next();
  }
};

//OBTENER LOS PRODUCTOS DE LA DB
exports.mostrarProductos = async (req, res, next) => {
  try {
    // obtener todos los productos
    const productos = await Productos.find({});
    res.json(productos);
  } catch (error) {
    console.log(error);
    next();
  }
};

//OBTENER UN PRODUCTO DE LA DB (DB) POR ID
exports.obtenerProducto = async (request, res, next) => {
  const producto = await Productos.findById(request.params.idProducto);

  if (!producto) {
    res.json({ mensaje: "El Producto no existe" });
    return next();
  }

  //MOSTRAR EL CLIENTE
  res.json(producto);
};

//ACTUALIZAR UN PRODUCTO VIA ID
exports.actualizarProducto = async (request, res, next) => {
  try {
    let producto = await Productos.findOneAndUpdate(
      { _id: request.params.idProducto },
      request.body,
      {
        new: true,
      }
    );

    //MOSTRAR EL PRODUCTO
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

//ELIMINAR UN PRODUCTO
exports.eliminarProducto = async (req, res, next) => {
  try {
    await Productos.findByIdAndDelete({ _id: request.params.idProducto });
    response.json({ mensaje: "Producto Eliminado correctamente" });
  } catch (error) {
    throw new Error();
    console.log(error);
    next();
  }
};
