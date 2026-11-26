import { buscarActuacionRepository, buscarArtistaRepository, asignarArtistaRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarArtistaService(actuacionId, artistaId, rol) {
  const actuacion = await buscarActuacionRepository(actuacionId);
  const artista = await buscarArtistaRepository(artistaId);
  if (!actuacion || !artista) {
    throw new ReferenciaInexistenteError('No existe la actuacion o el artista');
  }
  return asignarArtistaRepository(actuacionId, artistaId, rol);
}
