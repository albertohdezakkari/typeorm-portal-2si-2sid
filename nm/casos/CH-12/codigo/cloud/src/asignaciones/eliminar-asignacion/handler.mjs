import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const loteId = Number(event.pathParameters.loteId);
  const inspectorId = Number(event.pathParameters.inspectorId);
  await eliminarAsignacionService(loteId, inspectorId);
  return { statusCode: 204, body: '' };
}
