import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const funcionId = Number(event.pathParameters.funcionId);
  const interpreteId = Number(event.pathParameters.interpreteId);
  await eliminarAsignacionService(funcionId, interpreteId);
  return { statusCode: 204, body: '' };
}
