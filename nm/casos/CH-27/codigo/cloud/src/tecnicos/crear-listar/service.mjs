import { crearTecnicoRepository, listarTecnicosRepository } from './repository.mjs';

export async function crearTecnicoService(nombre, apellidos, email) {
  const tecnicoId = Date.now();
  const tecnico = { tecnicoId, nombre, apellidos, email };
  await crearTecnicoRepository(tecnico);
  return tecnico;
}

export function listarTecnicosService() {
  return listarTecnicosRepository();
}
