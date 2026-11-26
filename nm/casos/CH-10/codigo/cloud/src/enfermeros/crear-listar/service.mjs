import { crearEnfermeroRepository, listarEnfermerosRepository } from './repository.mjs';

export async function crearEnfermeroService(nombre, apellidos, email) {
  const enfermeroId = Date.now();
  const enfermero = { enfermeroId, nombre, apellidos, email };
  await crearEnfermeroRepository(enfermero);
  return enfermero;
}

export function listarEnfermerosService() {
  return listarEnfermerosRepository();
}
