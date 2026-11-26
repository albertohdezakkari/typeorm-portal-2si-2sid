import { buscarFuncionRepository, buscarInterpreteRepository, asignarInterpreteRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarInterpreteService(funcionId, interpreteId, rol) {
  const funcion = await buscarFuncionRepository(funcionId);
  const interprete = await buscarInterpreteRepository(interpreteId);
  if (!funcion || !interprete) {
    throw new ReferenciaInexistenteError('No existe la funcion o el interprete');
  }
  return asignarInterpreteRepository(funcionId, interpreteId, rol);
}
