import { crearAnalistaService, listarAnalistasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const analista = await crearAnalistaService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(analista) };
}

export async function listarHandler() {
  const analistas = await listarAnalistasService();
  return { statusCode: 200, body: JSON.stringify(analistas) };
}
