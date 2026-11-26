import { buscarPanaderiaRepository, consultarPanaderiaRepository } from './repository.mjs';

export async function consultarPanaderiaService(panaderiaId, minimo) {
  const panaderia = await buscarPanaderiaRepository(panaderiaId);
  if (!panaderia) throw new Error('Panaderia no encontrado');
  const productos = await consultarPanaderiaRepository(panaderiaId, minimo);
  return { panaderia, productos };
}
