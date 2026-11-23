import { eliminarObraService } from './service.mjs';

export async function handler(event) {
  const obraId = Number(event.pathParameters.obraId);
  await eliminarObraService(obraId);
  return { statusCode: 204 };
}
