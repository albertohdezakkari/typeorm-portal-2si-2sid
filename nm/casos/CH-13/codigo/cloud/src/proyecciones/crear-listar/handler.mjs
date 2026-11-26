import { crearProyeccionService, listarProyeccionesService } from './service.mjs';

export async function crearHandler(event) {
  const { pelicula, duracionMinutos, cineId } = JSON.parse(event.body);
  const proyeccion = await crearProyeccionService(pelicula, duracionMinutos, cineId);
  return { statusCode: 201, body: JSON.stringify(proyeccion) };
}

export async function listarHandler() {
  const proyecciones = await listarProyeccionesService();
  return { statusCode: 200, body: JSON.stringify(proyecciones) };
}
