import { crearDocumentoRepository, listarDocumentosRepository } from './repository.mjs';

export async function crearDocumentoService(nombre, paginas, archivoId) {
  const documentoId = Date.now();
  const documento = { documentoId, nombre, paginas, archivoId };
  await crearDocumentoRepository(documento);
  return documento;
}

export function listarDocumentosService() {
  return listarDocumentosRepository();
}
