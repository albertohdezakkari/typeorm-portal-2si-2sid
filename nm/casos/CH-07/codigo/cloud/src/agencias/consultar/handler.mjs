import { consultarAgenciaService } from './service.mjs';

export async function handler(event) {
  const agenciaId = Number(event.pathParameters.agenciaId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarAgenciaService(agenciaId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
