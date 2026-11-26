import { eliminarReparacionService } from './service.mjs';

export async function handler(event) {
  const reparacionId = Number(event.pathParameters.reparacionId);
  await eliminarReparacionService(reparacionId);
  return { statusCode: 204 };
}
