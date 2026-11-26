import { crearCocineroService, listarCocinerosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const cocinero = await crearCocineroService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(cocinero) };
}

export async function listarHandler() {
  const cocineros = await listarCocinerosService();
  return { statusCode: 200, body: JSON.stringify(cocineros) };
}
