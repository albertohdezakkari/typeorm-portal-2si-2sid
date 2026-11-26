import { crearPlazaRepository, listarPlazasRepository } from './repository.mjs';

export async function crearPlazaService(nombre, superficieM2, urbanizacionId) {
  const plazaId = Date.now();
  const plaza = { plazaId, nombre, superficieM2, urbanizacionId };
  await crearPlazaRepository(plaza);
  return plaza;
}

export function listarPlazasService() {
  return listarPlazasRepository();
}
