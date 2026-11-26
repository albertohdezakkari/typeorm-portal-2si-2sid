import { trasladarComandaRepository } from './repository.mjs';
import { buscarCafeteriaRepository } from '../../cafeterias/consultar/repository.mjs';

export async function trasladarComandaService(comandaId, cafeteriaId) {
  const cafeteria = await buscarCafeteriaRepository(cafeteriaId);
  if (!cafeteria) throw new Error('Cafeteria no encontrado');
  return trasladarComandaRepository(comandaId, cafeteriaId);
}
