import { trasladarAnimalRepository } from './repository.mjs';
import { buscarRefugioRepository } from '../../refugios/consultar/repository.mjs';

export async function trasladarAnimalService(animalId, refugioId) {
  const refugio = await buscarRefugioRepository(refugioId);
  if (!refugio) throw new Error('Refugio no encontrado');
  return trasladarAnimalRepository(animalId, refugioId);
}
