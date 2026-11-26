import { trasladarPlantaService } from './service.mjs';

export async function handler(event) {
  const plantaId = Number(event.pathParameters.plantaId);
  const { viveroId } = JSON.parse(event.body);
  const resultado = await trasladarPlantaService(plantaId, viveroId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
