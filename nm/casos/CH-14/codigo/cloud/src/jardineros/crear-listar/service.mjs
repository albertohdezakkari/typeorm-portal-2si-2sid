import { crearJardineroRepository, listarJardinerosRepository } from './repository.mjs';

export async function crearJardineroService(nombre, apellidos, email) {
  const jardineroId = Date.now();
  const jardinero = { jardineroId, nombre, apellidos, email };
  await crearJardineroRepository(jardinero);
  return jardinero;
}

export function listarJardinerosService() {
  return listarJardinerosRepository();
}
