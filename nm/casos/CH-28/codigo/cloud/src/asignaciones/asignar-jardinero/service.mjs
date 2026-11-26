import { buscarPlantaRepository, buscarJardineroRepository, asignarJardineroRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarJardineroService(plantaId, jardineroId, rol) {
  const planta = await buscarPlantaRepository(plantaId);
  const jardinero = await buscarJardineroRepository(jardineroId);
  if (!planta || !jardinero) {
    throw new ReferenciaInexistenteError('No existe la planta o el jardinero');
  }
  return asignarJardineroRepository(plantaId, jardineroId, rol);
}
