import { crearEnfermeroService, listarEnfermerosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const enfermero = await crearEnfermeroService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(enfermero) };
}

export async function listarHandler() {
  const enfermeros = await listarEnfermerosService();
  return { statusCode: 200, body: JSON.stringify(enfermeros) };
}
