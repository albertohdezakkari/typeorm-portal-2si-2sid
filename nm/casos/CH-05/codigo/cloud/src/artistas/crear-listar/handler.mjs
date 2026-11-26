import { crearArtistaService, listarArtistasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const artista = await crearArtistaService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(artista) };
}

export async function listarHandler() {
  const artistas = await listarArtistasService();
  return { statusCode: 200, body: JSON.stringify(artistas) };
}
