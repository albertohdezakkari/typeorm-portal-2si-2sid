import { crearSesionService, listarSesionesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, plazas, gimnasioId } = JSON.parse(event.body);
  const sesion = await crearSesionService(nombre, plazas, gimnasioId);
  return { statusCode: 201, body: JSON.stringify(sesion) };
}

export async function listarHandler() {
  const sesiones = await listarSesionesService();
  return { statusCode: 200, body: JSON.stringify(sesiones) };
}
