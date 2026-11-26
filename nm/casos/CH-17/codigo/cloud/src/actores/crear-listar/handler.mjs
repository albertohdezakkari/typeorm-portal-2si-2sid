import { crearActorService, listarActoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const actor = await crearActorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(actor) };
}

export async function listarHandler() {
  const actores = await listarActoresService();
  return { statusCode: 200, body: JSON.stringify(actores) };
}
