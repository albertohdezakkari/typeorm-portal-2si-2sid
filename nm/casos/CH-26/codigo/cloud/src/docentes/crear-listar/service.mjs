import { crearDocenteRepository, listarDocentesRepository } from './repository.mjs';

export async function crearDocenteService(nombre, apellidos, email) {
  const docenteId = Date.now();
  const docente = { docenteId, nombre, apellidos, email };
  await crearDocenteRepository(docente);
  return docente;
}

export function listarDocentesService() {
  return listarDocentesRepository();
}
