import { buscarPuertoRepository, consultarPuertoRepository } from './repository.mjs';

export async function consultarPuertoService(puertoId, minimo) {
  const puerto = await buscarPuertoRepository(puertoId);
  if (!puerto) throw new Error('Puerto no encontrado');
  const embarcaciones = await consultarPuertoRepository(puertoId, minimo);
  return { puerto, embarcaciones };
}
