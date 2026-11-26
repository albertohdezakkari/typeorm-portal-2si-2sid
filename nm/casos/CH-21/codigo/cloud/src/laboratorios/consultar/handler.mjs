import { consultarLaboratorioService } from './service.mjs';

export async function handler(event) {
  const laboratorioId = Number(event.pathParameters.laboratorioId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarLaboratorioService(laboratorioId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
