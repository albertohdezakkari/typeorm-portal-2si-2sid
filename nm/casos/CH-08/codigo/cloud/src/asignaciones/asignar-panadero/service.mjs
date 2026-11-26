import { buscarProductoRepository, buscarPanaderoRepository, asignarPanaderoRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarPanaderoService(productoId, panaderoId, rol) {
  const producto = await buscarProductoRepository(productoId);
  const panadero = await buscarPanaderoRepository(panaderoId);
  if (!producto || !panadero) {
    throw new ReferenciaInexistenteError('No existe el producto o el panadero');
  }
  return asignarPanaderoRepository(productoId, panaderoId, rol);
}
