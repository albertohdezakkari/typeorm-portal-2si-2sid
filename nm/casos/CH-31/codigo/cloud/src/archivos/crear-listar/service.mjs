import { crearArchivoRepository, listarArchivosRepository } from './repository.mjs';

export async function crearArchivoService(nombre) {
  const archivoId = Date.now();
  const archivo = { archivoId, nombre };
  await crearArchivoRepository(archivo);
  return archivo;
}

export function listarArchivosService() {
  return listarArchivosRepository();
}