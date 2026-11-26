import { crearInspectorService, listarInspectoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const inspector = await crearInspectorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(inspector) };
}

export async function listarHandler() {
  const inspectores = await listarInspectoresService();
  return { statusCode: 200, body: JSON.stringify(inspectores) };
}
