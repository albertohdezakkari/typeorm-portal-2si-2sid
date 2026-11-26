import { buscarZonaRepository, buscarJardineroRepository, asignarJardineroRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarJardineroService(zonaId, jardineroId, rol) {
  const zona = await buscarZonaRepository(zonaId);
  const jardinero = await buscarJardineroRepository(jardineroId);
  if (!zona || !jardinero) {
    throw new ReferenciaInexistenteError('No existe la zona o el jardinero');
  }
  return asignarJardineroRepository(zonaId, jardineroId, rol);
}
