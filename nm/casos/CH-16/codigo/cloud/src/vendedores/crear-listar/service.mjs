import { crearVendedorRepository, listarVendedoresRepository } from './repository.mjs';

export async function crearVendedorService(nombre, apellidos, email) {
  const vendedorId = Date.now();
  const vendedor = { vendedorId, nombre, apellidos, email };
  await crearVendedorRepository(vendedor);
  return vendedor;
}

export function listarVendedoresService() {
  return listarVendedoresRepository();
}
