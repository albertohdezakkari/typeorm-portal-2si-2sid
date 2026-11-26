import { crearCuidadorService, listarCuidadoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const cuidador = await crearCuidadorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(cuidador) };
}

export async function listarHandler() {
  const cuidadores = await listarCuidadoresService();
  return { statusCode: 200, body: JSON.stringify(cuidadores) };
}
