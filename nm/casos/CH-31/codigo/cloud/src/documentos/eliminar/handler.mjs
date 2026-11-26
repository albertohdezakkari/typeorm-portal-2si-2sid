import { eliminarDocumentoService } from './service.mjs';

export async function handler(event) {
  const documentoId = Number(event.pathParameters.documentoId);
  await eliminarDocumentoService(documentoId);
  return { statusCode: 204 };
}
