import { crearCooperativaRepository, listarCooperativasRepository } from './repository.mjs';

export async function crearCooperativaService(nombre) {
  const cooperativaId = Date.now();
  const cooperativa = { cooperativaId, nombre };
  await crearCooperativaRepository(cooperativa);
  return cooperativa;
}

export function listarCooperativasService() {
  return listarCooperativasRepository();
}