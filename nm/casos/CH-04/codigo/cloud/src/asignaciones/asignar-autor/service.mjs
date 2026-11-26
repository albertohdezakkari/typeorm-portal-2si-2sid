import { buscarPublicacionRepository, buscarAutorRepository, asignarAutorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarAutorService(publicacionId, autorId, rol) {
  const publicacion = await buscarPublicacionRepository(publicacionId);
  const autor = await buscarAutorRepository(autorId);
  if (!publicacion || !autor) {
    throw new ReferenciaInexistenteError('No existe la publicacion o el autor');
  }
  return asignarAutorRepository(publicacionId, autorId, rol);
}
