import { crearEmbarcacionService, listarEmbarcacionesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, esloraMetros, puertoId } = JSON.parse(event.body);
  const embarcacion = await crearEmbarcacionService(nombre, esloraMetros, puertoId);
  return { statusCode: 201, body: JSON.stringify(embarcacion) };
}

export async function listarHandler() {
  const embarcaciones = await listarEmbarcacionesService();
  return { statusCode: 200, body: JSON.stringify(embarcaciones) };
}
