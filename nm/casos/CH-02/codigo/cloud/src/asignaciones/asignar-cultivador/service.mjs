import { buscarParcelaRepository, buscarCultivadorRepository, asignarCultivadorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarCultivadorService(parcelaId, cultivadorId, rol) {
  const parcela = await buscarParcelaRepository(parcelaId);
  const cultivador = await buscarCultivadorRepository(cultivadorId);
  if (!parcela || !cultivador) {
    throw new ReferenciaInexistenteError('No existe la parcela o el cultivador');
  }
  return asignarCultivadorRepository(parcelaId, cultivadorId, rol);
}
