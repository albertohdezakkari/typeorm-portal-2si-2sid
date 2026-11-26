import { crearMuestraRepository, listarMuestrasRepository } from './repository.mjs';

export async function crearMuestraService(nombre, cantidadMl, laboratorioId) {
  const muestraId = Date.now();
  const muestra = { muestraId, nombre, cantidadMl, laboratorioId };
  await crearMuestraRepository(muestra);
  return muestra;
}

export function listarMuestrasService() {
  return listarMuestrasRepository();
}
