import { crearDocumentoService, listarDocumentosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, paginas, archivoId } = JSON.parse(event.body);
  const documento = await crearDocumentoService(nombre, paginas, archivoId);
  return { statusCode: 201, body: JSON.stringify(documento) };
}

export async function listarHandler() {
  const documentos = await listarDocumentosService();
  return { statusCode: 200, body: JSON.stringify(documentos) };
}
