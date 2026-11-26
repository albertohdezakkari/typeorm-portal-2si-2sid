import { trasladarEscenaRepository } from './repository.mjs';
import { buscarEstudioRepository } from '../../estudios/consultar/repository.mjs';

export async function trasladarEscenaService(escenaId, estudioId) {
  const estudio = await buscarEstudioRepository(estudioId);
  if (!estudio) throw new Error('Estudio no encontrado');
  return trasladarEscenaRepository(escenaId, estudioId);
}
