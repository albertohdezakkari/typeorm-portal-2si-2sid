import { eliminarComandaService } from './service.mjs';

export async function handler(event) {
  const comandaId = Number(event.pathParameters.comandaId);
  await eliminarComandaService(comandaId);
  return { statusCode: 204 };
}
