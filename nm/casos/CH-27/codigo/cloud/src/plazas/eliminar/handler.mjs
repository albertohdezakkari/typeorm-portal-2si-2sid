import { eliminarPlazaService } from './service.mjs';

export async function handler(event) {
  const plazaId = Number(event.pathParameters.plazaId);
  await eliminarPlazaService(plazaId);
  return { statusCode: 204 };
}
