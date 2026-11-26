import { crearProgramaService, listarProgramasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, duracionMinutos, emisoraId } = JSON.parse(event.body);
  const programa = await crearProgramaService(nombre, duracionMinutos, emisoraId);
  return { statusCode: 201, body: JSON.stringify(programa) };
}

export async function listarHandler() {
  const programas = await listarProgramasService();
  return { statusCode: 200, body: JSON.stringify(programas) };
}
