import { consultarEditorialService } from './service.mjs';

export async function handler(event) {
  const editorialId = Number(event.pathParameters.editorialId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarEditorialService(editorialId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
