import { buscarTrayectoRepository, buscarConductorRepository, asignarConductorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarConductorService(trayectoId, conductorId, rol) {
  const trayecto = await buscarTrayectoRepository(trayectoId);
  const conductor = await buscarConductorRepository(conductorId);
  if (!trayecto || !conductor) {
    throw new ReferenciaInexistenteError('No existe el trayecto o el conductor');
  }
  return asignarConductorRepository(trayectoId, conductorId, rol);
}
