import { eliminarLoteService } from './service.mjs';

export async function handler(event) {
  const loteId = Number(event.pathParameters.loteId);
  await eliminarLoteService(loteId);
  return { statusCode: 204 };
}
