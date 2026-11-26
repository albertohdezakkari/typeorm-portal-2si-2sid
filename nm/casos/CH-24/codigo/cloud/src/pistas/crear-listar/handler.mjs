import { crearPistaService, listarPistasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, superficieM2, complejoId } = JSON.parse(event.body);
  const pista = await crearPistaService(nombre, superficieM2, complejoId);
  return { statusCode: 201, body: JSON.stringify(pista) };
}

export async function listarHandler() {
  const pistas = await listarPistasService();
  return { statusCode: 200, body: JSON.stringify(pistas) };
}
