import { modificarDistanciaKmService } from './service.mjs';

export async function handler(event) {
  const trayectoId = Number(event.pathParameters.trayectoId);
  const { distanciaKm } = JSON.parse(event.body);
  const resultado = await modificarDistanciaKmService(trayectoId, distanciaKm);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
