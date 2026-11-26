import { crearArtistaRepository, listarArtistasRepository } from './repository.mjs';

export async function crearArtistaService(nombre, apellidos, email) {
  const artistaId = Date.now();
  const artista = { artistaId, nombre, apellidos, email };
  await crearArtistaRepository(artista);
  return artista;
}

export function listarArtistasService() {
  return listarArtistasRepository();
}
