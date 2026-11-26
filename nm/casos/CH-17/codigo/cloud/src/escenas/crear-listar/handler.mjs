import { crearEscenaService, listarEscenasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, duracionSegundos, estudioId } = JSON.parse(event.body);
  const escena = await crearEscenaService(nombre, duracionSegundos, estudioId);
  return { statusCode: 201, body: JSON.stringify(escena) };
}

export async function listarHandler() {
  const escenas = await listarEscenasService();
  return { statusCode: 200, body: JSON.stringify(escenas) };
}
