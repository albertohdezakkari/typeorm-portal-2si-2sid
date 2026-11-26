import { trasladarAulaService } from './service.mjs';

export async function handler(event) {
  const aulaId = Number(event.pathParameters.aulaId);
  const { escuelaId } = JSON.parse(event.body);
  const resultado = await trasladarAulaService(aulaId, escuelaId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
