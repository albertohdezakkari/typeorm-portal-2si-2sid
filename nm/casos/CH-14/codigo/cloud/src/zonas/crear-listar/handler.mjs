import { crearZonaService, listarZonasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, capacidad, parqueId } = JSON.parse(event.body);
  const zona = await crearZonaService(nombre, capacidad, parqueId);
  return { statusCode: 201, body: JSON.stringify(zona) };
}

export async function listarHandler() {
  const zonas = await listarZonasService();
  return { statusCode: 200, body: JSON.stringify(zonas) };
}
