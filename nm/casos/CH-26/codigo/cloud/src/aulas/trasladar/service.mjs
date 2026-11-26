import { trasladarAulaRepository } from './repository.mjs';
import { buscarEscuelaRepository } from '../../escuelas/consultar/repository.mjs';

export async function trasladarAulaService(aulaId, escuelaId) {
  const escuela = await buscarEscuelaRepository(escuelaId);
  if (!escuela) throw new Error('Escuela no encontrado');
  return trasladarAulaRepository(aulaId, escuelaId);
}
