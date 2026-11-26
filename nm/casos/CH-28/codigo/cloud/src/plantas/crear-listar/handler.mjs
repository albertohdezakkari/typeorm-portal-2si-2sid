import { crearPlantaService, listarPlantasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, alturaCm, viveroId } = JSON.parse(event.body);
  const planta = await crearPlantaService(nombre, alturaCm, viveroId);
  return { statusCode: 201, body: JSON.stringify(planta) };
}

export async function listarHandler() {
  const plantas = await listarPlantasService();
  return { statusCode: 200, body: JSON.stringify(plantas) };
}
