import { buscarProyeccionRepository, buscarTecnicoRepository, asignarTecnicoRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarTecnicoService(proyeccionId, tecnicoId, rol) {
  const proyeccion = await buscarProyeccionRepository(proyeccionId);
  const tecnico = await buscarTecnicoRepository(tecnicoId);
  if (!proyeccion || !tecnico) {
    throw new ReferenciaInexistenteError('No existe la proyeccion o el tecnico');
  }
  return asignarTecnicoRepository(proyeccionId, tecnicoId, rol);
}
