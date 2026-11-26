import { crearMecanicoService, listarMecanicosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const mecanico = await crearMecanicoService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(mecanico) };
}

export async function listarHandler() {
  const mecanicos = await listarMecanicosService();
  return { statusCode: 200, body: JSON.stringify(mecanicos) };
}
