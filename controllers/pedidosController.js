const Pedidos = require("../models/Pedidos");

exports.nuevoPedido = async (req, res, next) => {
  const pedido = new Pedidos(req.body);

  try {
    await pedido.save();
    res.json({ mensaje: "El pedido se realizo correctamente" });
  } catch (error) {
    console.log(error);
    next();
  }
};

//MOSTRAR TODOS LOS PEDIDOS
exports.mostrarPedidos = async (req, res, next) => {
  try {
    const pedido = await Pedidos.find({}).populate("cliente").populate({
      path: "pedido.producto",
      model: "Productos",
    });
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

//MOSTRAR PEDIDO POR ID
exports.obtenerPedido = async (req, res, next) => {
  const pedido = await Pedidos.findById(req.params.idPedido)
    .populate("cliente")
    .populate({
      path: "pedido.producto",
      model: "Productos",
    });

  if (!pedido) {
    res.json({ mensaje: "El Pedido no existe" });
    return next();
  }

  //MOSTRAR EL CLIENTE
  res.json(pedido);
};

//ACTUALIZAR PEDIDO VIA ID
exports.actualizarPedido = async (req, res, next) => {
  try {
    let pedido = await Pedidos.findOneAndUpdate(
      { _id: req.params.idPedido },
      req.body,
      {
        new: true,
      }
    )
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Productos",
      });
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

//ELIMINAR PEDIDO
exports.eliminarPedido = async (request, response, next) => {
  try {
    await Pedidos.findByIdAndDelete({ _id: request.params.idPedido });
    response.json({ mensaje: "Pedido Eliminado correctamente" });
  } catch (error) {
    throw new Error();
    console.log(error);
    next();
  }
};
