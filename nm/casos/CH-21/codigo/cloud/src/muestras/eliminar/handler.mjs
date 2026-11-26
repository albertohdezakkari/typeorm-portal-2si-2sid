import { eliminarMuestraService } from './service.mjs';

export async function handler(event) {
  const muestraId = Number(event.pathParameters.muestraId);
  await eliminarMuestraService(muestraId);
  return { statusCode: 204 };
}
