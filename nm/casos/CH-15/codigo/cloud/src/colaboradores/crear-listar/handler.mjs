import { crearColaboradorService, listarColaboradoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const colaborador = await crearColaboradorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(colaborador) };
}

export async function listarHandler() {
  const colaboradores = await listarColaboradoresService();
  return { statusCode: 200, body: JSON.stringify(colaboradores) };
}
