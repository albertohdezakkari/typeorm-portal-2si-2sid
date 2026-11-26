import { eliminarSesionService } from './service.mjs';

export async function handler(event) {
  const sesionId = Number(event.pathParameters.sesionId);
  await eliminarSesionService(sesionId);
  return { statusCode: 204 };
}
