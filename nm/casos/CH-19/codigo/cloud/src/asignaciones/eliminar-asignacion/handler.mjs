import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const embarcacionId = Number(event.pathParameters.embarcacionId);
  const tripulanteId = Number(event.pathParameters.tripulanteId);
  await eliminarAsignacionService(embarcacionId, tripulanteId);
  return { statusCode: 204, body: '' };
}
