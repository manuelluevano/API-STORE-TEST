const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const productoController = require("../controllers/productoController");
const pedidosController = require("../controllers/pedidosController");

module.exports = function () {
  //   ******** CLIENTES  ********  //

  //AGREGA NUEVOS CLIENTES VIA POST
  router.post("/clientes", clienteController.nuevoCliente);

  //OBTENER LOS CLIENTES VIA GET
  router.get("/clientes", clienteController.obtenerClientes);

  //MUESTRA UN CLIENTE EN ESPECIFICO (ID)
  router.get("/clientes/:idCliente", clienteController.obtenerCliente);

  // ACTUALIZAR CLIENTE
  router.put("/clientes/:idCliente", clienteController.actualizarCliente);

  //ELIMINAR UN CLIENTE
  router.delete("/clientes/:idCliente", clienteController.eliminarCliente);

  //   ******** PRODUCTOS  ********  //

  //AGREGA NUEVO PRODUCTO VIA POST
  router.post(
    "/productos",
    productoController.subirArchivo,
    productoController.nuevoProducto
  );

  //OBTENER LOS PRODUCTOS VIA GET
  router.get("/productos", productoController.obtenerProductos);

  //MUESTRA UN PRIDUCTO EN ESPECIFICO (ID)
  router.get("/productos/:idProducto", productoController.obtenerProducto);

  //ACTUALIZAR PRODUCTOS
  router.put(
    "/productos/:idProducto",
    productoController.subirArchivo,
    productoController.actualizarProducto
  );

  //ELIMINAR UN PRODUCTO
  router.delete("/productos/:idProducto", productoController.eliminarProducto);

  //   ******** PEDIDOS  ********  //

  //AGREGAR NUEVOS PEDIDOS
  router.post("/pedidos", pedidosController.nuevoPedido);

  //MOSTRAR TODOS LOS PEDIDOS CON RELACION A CLIENTE Y PRODUCTO
  router.get("/pedidos", pedidosController.mostrarPedidos);

  //MOSTRAR  PEDIDO POR ID
  router.get("/pedidos/:idPedido", pedidosController.obtenerPedido);

  //ACTUALIZAR PEDIDO
  router.put("/pedidos/:idPedido", pedidosController.actualizarPedido);

  //ELIMINAR UN PRODUCTO
  router.delete("/pedidos/:idPedido", pedidosController.eliminarPedido);

  return router;
};
