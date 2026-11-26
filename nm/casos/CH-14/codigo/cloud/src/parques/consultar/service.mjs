import { buscarParqueRepository, consultarParqueRepository } from './repository.mjs';

export async function consultarParqueService(parqueId, minimo) {
  const parque = await buscarParqueRepository(parqueId);
  if (!parque) throw new Error('Parque no encontrado');
  const zonas = await consultarParqueRepository(parqueId, minimo);
  return { parque, zonas };
}
