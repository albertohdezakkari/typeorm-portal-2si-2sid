import { crearEntrenadorService, listarEntrenadoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const entrenador = await crearEntrenadorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(entrenador) };
}

export async function listarHandler() {
  const entrenadores = await listarEntrenadoresService();
  return { statusCode: 200, body: JSON.stringify(entrenadores) };
}
