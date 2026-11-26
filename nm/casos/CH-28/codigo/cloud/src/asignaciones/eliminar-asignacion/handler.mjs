import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const plantaId = Number(event.pathParameters.plantaId);
  const jardineroId = Number(event.pathParameters.jardineroId);
  await eliminarAsignacionService(plantaId, jardineroId);
  return { statusCode: 204, body: '' };
}
