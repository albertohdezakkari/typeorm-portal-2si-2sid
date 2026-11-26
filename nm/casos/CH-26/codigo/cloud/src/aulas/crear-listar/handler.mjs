import { crearAulaService, listarAulasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, capacidad, escuelaId } = JSON.parse(event.body);
  const aula = await crearAulaService(nombre, capacidad, escuelaId);
  return { statusCode: 201, body: JSON.stringify(aula) };
}

export async function listarHandler() {
  const aulas = await listarAulasService();
  return { statusCode: 200, body: JSON.stringify(aulas) };
}
