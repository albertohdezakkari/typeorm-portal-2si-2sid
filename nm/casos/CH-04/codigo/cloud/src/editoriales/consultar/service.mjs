import { buscarEditorialRepository, consultarEditorialRepository } from './repository.mjs';

export async function consultarEditorialService(editorialId, minimo) {
  const editorial = await buscarEditorialRepository(editorialId);
  if (!editorial) throw new Error('Editorial no encontrado');
  const publicaciones = await consultarEditorialRepository(editorialId, minimo);
  return { editorial, publicaciones };
}
