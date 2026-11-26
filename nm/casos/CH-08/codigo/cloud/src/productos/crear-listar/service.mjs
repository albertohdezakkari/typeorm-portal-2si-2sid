import { crearProductoRepository, listarProductosRepository } from './repository.mjs';

export async function crearProductoService(nombre, precioCentimos, panaderiaId) {
  const productoId = Date.now();
  const producto = { productoId, nombre, precioCentimos, panaderiaId };
  await crearProductoRepository(producto);
  return producto;
}

export function listarProductosService() {
  return listarProductosRepository();
}
