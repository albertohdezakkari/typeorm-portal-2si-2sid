import { consultarArchivoService } from './service.mjs';

export async function handler(event) {
  const archivoId = Number(event.pathParameters.archivoId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarArchivoService(archivoId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
