const Clientes = require("../models/Clientes");

//Agrega un nuevo cliente
exports.nuevoCliente = async (request, response, next) => {
  // console.log(request.body);

  const cliente = new Clientes(request.body);

  try {
    await cliente.save();
    response.json({ mensaje: "Se agreggo el nuevo cliente" });
  } catch (error) {
    throw new Error();
    console.log(error);
    next();
  }
};

//OBTENER LOS CLIENTES DE LA DB
exports.obtenerClientes = async (request, response, next) => {
  try {
    const clientes = await Clientes.find({});
    response.json(clientes);
  } catch (error) {
    throw new Error();
    console.log(error);
    next();
  }
};

//OBTENER UN CLIENTE DE LA DB (DB) POR ID
exports.obtenerCliente = async (request, response, next) => {
  const cliente = await Clientes.findById(request.params.idCliente);

  if (!cliente) {
    response.json({ mensaje: "El cliente no existe" });
    next();
  }

  //MOSTRAR EL CLIENTE
  response.json(cliente);
};

//ACTUALIZAR UN CLIENTE POR SU ID
exports.actualizarCliente = async (request, response, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate(
      { _id: request.params.idCliente },
      request.body,
      {
        new: true,
      }
    );
    response.json(cliente);
  } catch (error) {
    throw new Error();
    console.log(error);
    next();
  }
};

//ELIMINAR CLIENTE POR ID
exports.eliminarCliente = async (request, response, next) => {
  try {
    await Clientes.findByIdAndDelete({ _id: request.params.idCliente });
    response.json({ mensaje: "Cliente Eliminado correctamente" });
  } catch (error) {
    throw new Error();
    console.log(error);
    next();
  }
};
