import { eliminarProductoRepository } from './repository.mjs';

export async function eliminarProductoService(productoId) {
  await eliminarProductoRepository(productoId);
}
