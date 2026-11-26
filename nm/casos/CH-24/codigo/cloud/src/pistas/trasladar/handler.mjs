import { trasladarPistaService } from './service.mjs';

export async function handler(event) {
  const pistaId = Number(event.pathParameters.pistaId);
  const { complejoId } = JSON.parse(event.body);
  const resultado = await trasladarPistaService(pistaId, complejoId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
