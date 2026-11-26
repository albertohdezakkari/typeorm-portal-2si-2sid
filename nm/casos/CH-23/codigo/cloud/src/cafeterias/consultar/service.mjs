import { buscarCafeteriaRepository, consultarCafeteriaRepository } from './repository.mjs';

export async function consultarCafeteriaService(cafeteriaId, minimo) {
  const cafeteria = await buscarCafeteriaRepository(cafeteriaId);
  if (!cafeteria) throw new Error('Cafeteria no encontrado');
  const comandas = await consultarCafeteriaRepository(cafeteriaId, minimo);
  return { cafeteria, comandas };
}
