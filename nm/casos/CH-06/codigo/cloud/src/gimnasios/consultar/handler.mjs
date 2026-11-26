import { consultarGimnasioService } from './service.mjs';

export async function handler(event) {
  const gimnasioId = Number(event.pathParameters.gimnasioId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarGimnasioService(gimnasioId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
