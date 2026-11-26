import { crearPublicacionService, listarPublicacionesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, paginas, editorialId } = JSON.parse(event.body);
  const publicacion = await crearPublicacionService(nombre, paginas, editorialId);
  return { statusCode: 201, body: JSON.stringify(publicacion) };
}

export async function listarHandler() {
  const publicaciones = await listarPublicacionesService();
  return { statusCode: 200, body: JSON.stringify(publicaciones) };
}
