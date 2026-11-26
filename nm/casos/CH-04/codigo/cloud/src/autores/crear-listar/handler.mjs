import { crearAutorService, listarAutoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const autor = await crearAutorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(autor) };
}

export async function listarHandler() {
  const autores = await listarAutoresService();
  return { statusCode: 200, body: JSON.stringify(autores) };
}
