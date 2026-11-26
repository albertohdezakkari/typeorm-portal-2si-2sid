import { crearTrayectoService, listarTrayectosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, distanciaKm, estacionId } = JSON.parse(event.body);
  const trayecto = await crearTrayectoService(nombre, distanciaKm, estacionId);
  return { statusCode: 201, body: JSON.stringify(trayecto) };
}

export async function listarHandler() {
  const trayectos = await listarTrayectosService();
  return { statusCode: 200, body: JSON.stringify(trayectos) };
}
