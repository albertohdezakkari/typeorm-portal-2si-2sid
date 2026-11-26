import { trasladarPiezaRepository } from './repository.mjs';
import { buscarMuseoRepository } from '../../museos/consultar/repository.mjs';

export async function trasladarPiezaService(piezaId, museoId) {
  const museo = await buscarMuseoRepository(museoId);
  if (!museo) throw new Error('Museo no encontrado');
  return trasladarPiezaRepository(piezaId, museoId);
}
