import { crearPanaderoService, listarPanaderosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const panadero = await crearPanaderoService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(panadero) };
}

export async function listarHandler() {
  const panaderos = await listarPanaderosService();
  return { statusCode: 200, body: JSON.stringify(panaderos) };
}
