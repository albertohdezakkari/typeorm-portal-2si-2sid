import { crearFuncionService, listarFuncionesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, aforo, teatroId } = JSON.parse(event.body);
  const funcion = await crearFuncionService(nombre, aforo, teatroId);
  return { statusCode: 201, body: JSON.stringify(funcion) };
}

export async function listarHandler() {
  const funciones = await listarFuncionesService();
  return { statusCode: 200, body: JSON.stringify(funciones) };
}
