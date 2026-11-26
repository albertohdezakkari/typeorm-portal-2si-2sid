import { trasladarEmbarcacionService } from './service.mjs';

export async function handler(event) {
  const embarcacionId = Number(event.pathParameters.embarcacionId);
  const { puertoId } = JSON.parse(event.body);
  const resultado = await trasladarEmbarcacionService(embarcacionId, puertoId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
