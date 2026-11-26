import { crearInstructorService, listarInstructoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const instructor = await crearInstructorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(instructor) };
}

export async function listarHandler() {
  const instructores = await listarInstructoresService();
  return { statusCode: 200, body: JSON.stringify(instructores) };
}
