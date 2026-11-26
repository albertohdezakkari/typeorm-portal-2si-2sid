import { crearReparacionService, listarReparacionesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, costeCentimos, tallerId } = JSON.parse(event.body);
  const reparacion = await crearReparacionService(nombre, costeCentimos, tallerId);
  return { statusCode: 201, body: JSON.stringify(reparacion) };
}

export async function listarHandler() {
  const reparaciones = await listarReparacionesService();
  return { statusCode: 200, body: JSON.stringify(reparaciones) };
}
