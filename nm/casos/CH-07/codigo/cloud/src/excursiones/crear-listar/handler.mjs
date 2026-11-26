import { crearExcursionService, listarExcursionesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, duracionHoras, agenciaId } = JSON.parse(event.body);
  const excursion = await crearExcursionService(nombre, duracionHoras, agenciaId);
  return { statusCode: 201, body: JSON.stringify(excursion) };
}

export async function listarHandler() {
  const excursiones = await listarExcursionesService();
  return { statusCode: 200, body: JSON.stringify(excursiones) };
}
