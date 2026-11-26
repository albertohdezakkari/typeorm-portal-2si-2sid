import { trasladarDocumentoService } from './service.mjs';

export async function handler(event) {
  const documentoId = Number(event.pathParameters.documentoId);
  const { archivoId } = JSON.parse(event.body);
  const resultado = await trasladarDocumentoService(documentoId, archivoId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
