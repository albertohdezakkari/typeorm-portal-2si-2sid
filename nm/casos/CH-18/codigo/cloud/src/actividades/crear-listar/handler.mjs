import { crearActividadService, listarActividadesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, plazas, clubId } = JSON.parse(event.body);
  const actividad = await crearActividadService(nombre, plazas, clubId);
  return { statusCode: 201, body: JSON.stringify(actividad) };
}

export async function listarHandler() {
  const actividades = await listarActividadesService();
  return { statusCode: 200, body: JSON.stringify(actividades) };
}
