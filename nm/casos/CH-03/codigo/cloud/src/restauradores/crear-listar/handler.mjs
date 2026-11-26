import { crearRestauradorService, listarRestauradoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const restaurador = await crearRestauradorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(restaurador) };
}

export async function listarHandler() {
  const restauradores = await listarRestauradoresService();
  return { statusCode: 200, body: JSON.stringify(restauradores) };
}
