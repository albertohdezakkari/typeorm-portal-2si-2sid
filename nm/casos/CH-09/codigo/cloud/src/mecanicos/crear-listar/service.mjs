import { crearMecanicoRepository, listarMecanicosRepository } from './repository.mjs';

export async function crearMecanicoService(nombre, apellidos, email) {
  const mecanicoId = Date.now();
  const mecanico = { mecanicoId, nombre, apellidos, email };
  await crearMecanicoRepository(mecanico);
  return mecanico;
}

export function listarMecanicosService() {
  return listarMecanicosRepository();
}
