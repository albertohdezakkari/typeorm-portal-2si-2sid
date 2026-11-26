import { buscarHabitacionRepository, buscarEnfermeroRepository, asignarEnfermeroRepository } from './repository.mjs';

export class ReferenciaInexistenteError extends Error {}

export async function asignarEnfermeroService(habitacionId, enfermeroId, rol) {
  const habitacion = await buscarHabitacionRepository(habitacionId);
  const enfermero = await buscarEnfermeroRepository(enfermeroId);
  if (!habitacion || !enfermero) {
    throw new ReferenciaInexistenteError('No existe la habitacion o el enfermero');
  }
  return asignarEnfermeroRepository(habitacionId, enfermeroId, rol);
}
