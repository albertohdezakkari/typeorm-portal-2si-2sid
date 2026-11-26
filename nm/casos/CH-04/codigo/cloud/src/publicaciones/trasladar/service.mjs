import { trasladarPublicacionRepository } from './repository.mjs';
import { buscarEditorialRepository } from '../../editoriales/consultar/repository.mjs';

export async function trasladarPublicacionService(publicacionId, editorialId) {
  const editorial = await buscarEditorialRepository(editorialId);
  if (!editorial) throw new Error('Editorial no encontrado');
  return trasladarPublicacionRepository(publicacionId, editorialId);
}
