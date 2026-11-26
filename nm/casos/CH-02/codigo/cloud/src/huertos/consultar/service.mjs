import { buscarHuertoRepository, consultarHuertoRepository } from './repository.mjs';

export async function consultarHuertoService(huertoId, minimo) {
  const huerto = await buscarHuertoRepository(huertoId);
  if (!huerto) throw new Error('Huerto no encontrado');
  const parcelas = await consultarHuertoRepository(huertoId, minimo);
  return { huerto, parcelas };
}
