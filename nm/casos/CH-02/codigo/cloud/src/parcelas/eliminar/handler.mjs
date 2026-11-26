import { eliminarParcelaService } from './service.mjs';

export async function handler(event) {
  const parcelaId = Number(event.pathParameters.parcelaId);
  await eliminarParcelaService(parcelaId);
  return { statusCode: 204 };
}
