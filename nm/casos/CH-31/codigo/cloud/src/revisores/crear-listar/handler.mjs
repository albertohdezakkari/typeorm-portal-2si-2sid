import { crearRevisorService, listarRevisoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const revisor = await crearRevisorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(revisor) };
}

export async function listarHandler() {
  const revisores = await listarRevisoresService();
  return { statusCode: 200, body: JSON.stringify(revisores) };
}
