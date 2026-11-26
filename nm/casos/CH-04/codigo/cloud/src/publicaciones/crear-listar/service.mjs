import { crearPublicacionRepository, listarPublicacionesRepository } from './repository.mjs';

export async function crearPublicacionService(nombre, paginas, editorialId) {
  const publicacionId = Date.now();
  const publicacion = { publicacionId, nombre, paginas, editorialId };
  await crearPublicacionRepository(publicacion);
  return publicacion;
}

export function listarPublicacionesService() {
  return listarPublicacionesRepository();
}
