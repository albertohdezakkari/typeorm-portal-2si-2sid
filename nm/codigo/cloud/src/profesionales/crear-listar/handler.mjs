import { crearProfesionalService, listarProfesionalesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const profesional = await crearProfesionalService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(profesional) };
}

export async function listarHandler() {
  const profesionales = await listarProfesionalesService();
  return { statusCode: 200, body: JSON.stringify(profesionales) };
}
