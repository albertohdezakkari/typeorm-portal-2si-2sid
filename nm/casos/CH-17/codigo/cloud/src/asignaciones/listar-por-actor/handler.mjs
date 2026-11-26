import { listarAsignacionesPorActorService } from './service.mjs';

export async function handler(event) {
  const actorId = Number(event.pathParameters.actorId);
  const asignaciones = await listarAsignacionesPorActorService(actorId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
