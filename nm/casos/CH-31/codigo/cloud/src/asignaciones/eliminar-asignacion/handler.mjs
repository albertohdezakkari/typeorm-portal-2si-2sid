import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const documentoId = Number(event.pathParameters.documentoId);
  const revisorId = Number(event.pathParameters.revisorId);
  await eliminarAsignacionService(documentoId, revisorId);
  return { statusCode: 204, body: '' };
}
