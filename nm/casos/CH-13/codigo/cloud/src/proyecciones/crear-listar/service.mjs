import { crearProyeccionRepository, listarProyeccionesRepository } from './repository.mjs';

export async function crearProyeccionService(pelicula, duracionMinutos, cineId) {
  const proyeccionId = Date.now();
  const proyeccion = { proyeccionId, pelicula, duracionMinutos, cineId };
  await crearProyeccionRepository(proyeccion);
  return proyeccion;
}

export function listarProyeccionesService() {
  return listarProyeccionesRepository();
}
