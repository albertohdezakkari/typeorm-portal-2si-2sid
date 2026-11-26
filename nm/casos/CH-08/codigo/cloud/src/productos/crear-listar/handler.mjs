import { crearProductoService, listarProductosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, precioCentimos, panaderiaId } = JSON.parse(event.body);
  const producto = await crearProductoService(nombre, precioCentimos, panaderiaId);
  return { statusCode: 201, body: JSON.stringify(producto) };
}

export async function listarHandler() {
  const productos = await listarProductosService();
  return { statusCode: 200, body: JSON.stringify(productos) };
}
