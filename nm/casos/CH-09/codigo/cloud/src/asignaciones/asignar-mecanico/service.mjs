import { buscarReparacionRepository, buscarMecanicoRepository, asignarMecanicoRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarMecanicoService(reparacionId, mecanicoId, rol) {
  const reparacion = await buscarReparacionRepository(reparacionId);
  const mecanico = await buscarMecanicoRepository(mecanicoId);
  if (!reparacion || !mecanico) {
    throw new ReferenciaInexistenteError('No existe la reparacion o el mecanico');
  }
  return asignarMecanicoRepository(reparacionId, mecanicoId, rol);
}
