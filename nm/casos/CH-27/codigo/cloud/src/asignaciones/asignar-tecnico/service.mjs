import { buscarPlazaRepository, buscarTecnicoRepository, asignarTecnicoRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarTecnicoService(plazaId, tecnicoId, rol) {
  const plaza = await buscarPlazaRepository(plazaId);
  const tecnico = await buscarTecnicoRepository(tecnicoId);
  if (!plaza || !tecnico) {
    throw new ReferenciaInexistenteError('No existe la plaza o el tecnico');
  }
  return asignarTecnicoRepository(plazaId, tecnicoId, rol);
}
