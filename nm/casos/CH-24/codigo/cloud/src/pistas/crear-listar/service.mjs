import { crearPistaRepository, listarPistasRepository } from './repository.mjs';

export async function crearPistaService(nombre, superficieM2, complejoId) {
  const pistaId = Date.now();
  const pista = { pistaId, nombre, superficieM2, complejoId };
  await crearPistaRepository(pista);
  return pista;
}

export function listarPistasService() {
  return listarPistasRepository();
}
