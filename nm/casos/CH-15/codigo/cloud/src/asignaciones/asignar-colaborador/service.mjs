import { buscarProyectoRepository, buscarColaboradorRepository, asignarColaboradorRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarColaboradorService(proyectoId, colaboradorId, rol) {
  const proyecto = await buscarProyectoRepository(proyectoId);
  const colaborador = await buscarColaboradorRepository(colaboradorId);
  if (!proyecto || !colaborador) {
    throw new ReferenciaInexistenteError('No existe el proyecto o el colaborador');
  }
  return asignarColaboradorRepository(proyectoId, colaboradorId, rol);
}
