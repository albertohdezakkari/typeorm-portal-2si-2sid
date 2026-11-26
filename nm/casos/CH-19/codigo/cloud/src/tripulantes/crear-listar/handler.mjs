import { crearTripulanteService, listarTripulantesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const tripulante = await crearTripulanteService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(tripulante) };
}

export async function listarHandler() {
  const tripulantes = await listarTripulantesService();
  return { statusCode: 200, body: JSON.stringify(tripulantes) };
}
