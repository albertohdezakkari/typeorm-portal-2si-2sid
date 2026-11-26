import { buscarArticuloRepository, buscarVendedorRepository, asignarVendedorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarVendedorService(articuloId, vendedorId, rol) {
  const articulo = await buscarArticuloRepository(articuloId);
  const vendedor = await buscarVendedorRepository(vendedorId);
  if (!articulo || !vendedor) {
    throw new ReferenciaInexistenteError('No existe el articulo o el vendedor');
  }
  return asignarVendedorRepository(articuloId, vendedorId, rol);
}
