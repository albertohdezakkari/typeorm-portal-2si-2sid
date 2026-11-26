import { crearJardineroService, listarJardinerosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const jardinero = await crearJardineroService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(jardinero) };
}

export async function listarHandler() {
  const jardineros = await listarJardinerosService();
  return { statusCode: 200, body: JSON.stringify(jardineros) };
}
