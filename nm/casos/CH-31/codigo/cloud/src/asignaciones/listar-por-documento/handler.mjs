import { listarAsignacionesPorDocumentoService } from './service.mjs';

export async function handler(event) {
  const documentoId = Number(event.pathParameters.documentoId);
  const asignaciones = await listarAsignacionesPorDocumentoService(documentoId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
