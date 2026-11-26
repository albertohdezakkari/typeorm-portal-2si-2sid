import { crearMonitorService, listarMonitoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const monitor = await crearMonitorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(monitor) };
}

export async function listarHandler() {
  const monitores = await listarMonitoresService();
  return { statusCode: 200, body: JSON.stringify(monitores) };
}
