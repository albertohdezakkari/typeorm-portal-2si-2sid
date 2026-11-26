import { modificarAlturaCmService } from './service.mjs';

export async function handler(event) {
  const plantaId = Number(event.pathParameters.plantaId);
  const { alturaCm } = JSON.parse(event.body);
  const resultado = await modificarAlturaCmService(plantaId, alturaCm);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
