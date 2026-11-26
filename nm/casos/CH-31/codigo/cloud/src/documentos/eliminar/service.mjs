import { eliminarDocumentoRepository } from './repository.mjs';

export async function eliminarDocumentoService(documentoId) {
  await eliminarDocumentoRepository(documentoId);
}
