import { trasladarEmbarcacionRepository } from './repository.mjs';
import { buscarPuertoRepository } from '../../puertos/consultar/repository.mjs';

export async function trasladarEmbarcacionService(embarcacionId, puertoId) {
  const puerto = await buscarPuertoRepository(puertoId);
  if (!puerto) throw new Error('Puerto no encontrado');
  return trasladarEmbarcacionRepository(embarcacionId, puertoId);
}
