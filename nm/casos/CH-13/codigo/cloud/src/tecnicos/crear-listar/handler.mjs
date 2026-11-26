import { crearTecnicoService, listarTecnicosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const tecnico = await crearTecnicoService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(tecnico) };
}

export async function listarHandler() {
  const tecnicos = await listarTecnicosService();
  return { statusCode: 200, body: JSON.stringify(tecnicos) };
}
