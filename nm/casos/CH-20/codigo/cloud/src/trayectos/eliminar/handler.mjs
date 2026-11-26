import { eliminarTrayectoService } from './service.mjs';

export async function handler(event) {
  const trayectoId = Number(event.pathParameters.trayectoId);
  await eliminarTrayectoService(trayectoId);
  return { statusCode: 204 };
}
