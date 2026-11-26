import { crearParcelaRepository, listarParcelasRepository } from './repository.mjs';

export async function crearParcelaService(nombre, superficieM2, huertoId) {
  const parcelaId = Date.now();
  const parcela = { parcelaId, nombre, superficieM2, huertoId };
  await crearParcelaRepository(parcela);
  return parcela;
}

export function listarParcelasService() {
  return listarParcelasRepository();
}
