import { trasladarDocumentoRepository } from './repository.mjs';
import { buscarArchivoRepository } from '../../archivos/consultar/repository.mjs';

export async function trasladarDocumentoService(documentoId, archivoId) {
  const archivo = await buscarArchivoRepository(archivoId);
  if (!archivo) throw new Error('Archivo no encontrado');
  return trasladarDocumentoRepository(documentoId, archivoId);
}
