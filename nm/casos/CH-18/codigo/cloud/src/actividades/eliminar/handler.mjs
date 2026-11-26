import { eliminarActividadService } from './service.mjs';

export async function handler(event) {
  const actividadId = Number(event.pathParameters.actividadId);
  await eliminarActividadService(actividadId);
  return { statusCode: 204 };
}
