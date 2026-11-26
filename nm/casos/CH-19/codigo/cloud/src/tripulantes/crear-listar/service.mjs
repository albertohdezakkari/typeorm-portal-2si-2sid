import { crearTripulanteRepository, listarTripulantesRepository } from './repository.mjs';

export async function crearTripulanteService(nombre, apellidos, email) {
  const tripulanteId = Date.now();
  const tripulante = { tripulanteId, nombre, apellidos, email };
  await crearTripulanteRepository(tripulante);
  return tripulante;
}

export function listarTripulantesService() {
  return listarTripulantesRepository();
}
