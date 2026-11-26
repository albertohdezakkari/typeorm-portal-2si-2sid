import { trasladarEscenaService } from './service.mjs';

export async function handler(event) {
  const escenaId = Number(event.pathParameters.escenaId);
  const { estudioId } = JSON.parse(event.body);
  const resultado = await trasladarEscenaService(escenaId, estudioId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
