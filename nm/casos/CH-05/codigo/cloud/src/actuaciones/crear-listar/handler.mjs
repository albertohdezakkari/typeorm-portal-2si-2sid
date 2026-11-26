import { crearActuacionService, listarActuacionesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, duracionMinutos, festivalId } = JSON.parse(event.body);
  const actuacion = await crearActuacionService(nombre, duracionMinutos, festivalId);
  return { statusCode: 201, body: JSON.stringify(actuacion) };
}

export async function listarHandler() {
  const actuaciones = await listarActuacionesService();
  return { statusCode: 200, body: JSON.stringify(actuaciones) };
}
