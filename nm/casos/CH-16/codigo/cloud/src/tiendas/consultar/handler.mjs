import { consultarTiendaService } from './service.mjs';

export async function handler(event) {
  const tiendaId = Number(event.pathParameters.tiendaId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarTiendaService(tiendaId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
