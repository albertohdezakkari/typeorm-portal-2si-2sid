import { buscarArchivoRepository, consultarArchivoRepository } from './repository.mjs';

export async function consultarArchivoService(archivoId, minimo) {
  const archivo = await buscarArchivoRepository(archivoId);
  if (!archivo) throw new Error('Archivo no encontrado');
  const documentos = await consultarArchivoRepository(archivoId, minimo);
  return { archivo, documentos };
}
