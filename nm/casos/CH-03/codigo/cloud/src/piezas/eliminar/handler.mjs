import { eliminarPiezaService } from './service.mjs';

export async function handler(event) {
  const piezaId = Number(event.pathParameters.piezaId);
  await eliminarPiezaService(piezaId);
  return { statusCode: 204 };
}
