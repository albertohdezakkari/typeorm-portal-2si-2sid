import { buscarEmbarcacionRepository, buscarTripulanteRepository, asignarTripulanteRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarTripulanteService(embarcacionId, tripulanteId, rol) {
  const embarcacion = await buscarEmbarcacionRepository(embarcacionId);
  const tripulante = await buscarTripulanteRepository(tripulanteId);
  if (!embarcacion || !tripulante) {
    throw new ReferenciaInexistenteError('No existe la embarcacion o el tripulante');
  }
  return asignarTripulanteRepository(embarcacionId, tripulanteId, rol);
}
