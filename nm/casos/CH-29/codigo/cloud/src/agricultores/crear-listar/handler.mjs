import { crearAgricultorService, listarAgricultoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const agricultor = await crearAgricultorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(agricultor) };
}

export async function listarHandler() {
  const agricultores = await listarAgricultoresService();
  return { statusCode: 200, body: JSON.stringify(agricultores) };
}
