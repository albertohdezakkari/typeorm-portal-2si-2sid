import { crearEditorialRepository, listarEditorialesRepository } from './repository.mjs';

export async function crearEditorialService(nombre) {
  const editorialId = Date.now();
  const editorial = { editorialId, nombre };
  await crearEditorialRepository(editorial);
  return editorial;
}

export function listarEditorialesService() {
  return listarEditorialesRepository();
}