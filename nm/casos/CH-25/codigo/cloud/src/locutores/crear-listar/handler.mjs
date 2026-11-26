import { crearLocutorService, listarLocutoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const locutor = await crearLocutorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(locutor) };
}

export async function listarHandler() {
  const locutores = await listarLocutoresService();
  return { statusCode: 200, body: JSON.stringify(locutores) };
}
