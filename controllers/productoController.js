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
      cb(new Error("Formato no válido"));
    }
  },
};

//PASAR LA CONFIGURACION Y EL CAMPO'
const upload = multer(configuracionMulter).single("imagen");

//SUBE UN ARCHIVO`
exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error.message });
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
    res.json({
      mensaje: "Se agrego un nuevo producto",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

//OBTENER LOS PRODUCTOS DE LA DB
exports.obtenerProductos = async (request, response, next) => {
  try {
    const productos = await Productos.find({});
    response.json(productos);
  } catch (error) {
    throw new Error();
    console.log(error);
    next();
  }
};

//OBTENER UN CLIENTE DE LA DB (DB) POR ID
exports.obtenerProducto = async (request, res, next) => {
  const producto = await Productos.findById(request.params.idProducto);

  if (!producto) {
    res.json({ mensaje: "El Producto no existe" });
    return next();
  }

  //MOSTRAR EL CLIENTE
  res.json(producto);
};

//ACTUALIZAR UN PRODUCTO DE LA DB (DB) POR ID
exports.actualizarProducto = async (request, res, next) => {
  try {
    //ACTUALIZAR IMAGEN
    let productoAnterior = await Productos.findById(request.params.idProducto);

    //CONSTRUIR UN NUEVO PRODUCTO
    let nuevoProducto = request.body;

    //VERIFICAR SI EXISTE UNA NUEVA IMAGEN
    if (request.file) {
      nuevoProducto.imagen = request.file.filename;
    } else {
      nuevoProducto.imagen = productoAnterior.imagen;
    }

    let producto = await Productos.findOneAndUpdate(
      {
        _id: request.params.idProducto,
      },
      nuevoProducto,
      {
        new: true,
      }
    );
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

//ELIMINAR PRODUCTO POR ID
exports.eliminarProducto = async (request, response, next) => {
  try {
    await Productos.findByIdAndDelete({ _id: request.params.idProducto });
    response.json({ mensaje: "Producto Eliminado correctamente" });
  } catch (error) {
    throw new Error();
    console.log(error);
    next();
  }
};
