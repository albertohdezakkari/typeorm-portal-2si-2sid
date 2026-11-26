import { eliminarActuacionService } from './service.mjs';

export async function handler(event) {
  const actuacionId = Number(event.pathParameters.actuacionId);
  await eliminarActuacionService(actuacionId);
  return { statusCode: 204 };
}
