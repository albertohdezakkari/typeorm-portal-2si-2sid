import { trasladarParcelaRepository } from './repository.mjs';
import { buscarHuertoRepository } from '../../huertos/consultar/repository.mjs';

export async function trasladarParcelaService(parcelaId, huertoId) {
  const huerto = await buscarHuertoRepository(huertoId);
  if (!huerto) throw new Error('Huerto no encontrado');
  return trasladarParcelaRepository(parcelaId, huertoId);
}
