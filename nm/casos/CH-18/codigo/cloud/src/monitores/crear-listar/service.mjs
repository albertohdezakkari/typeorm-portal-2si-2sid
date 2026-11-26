import { crearMonitorRepository, listarMonitoresRepository } from './repository.mjs';

export async function crearMonitorService(nombre, apellidos, email) {
  const monitorId = Date.now();
  const monitor = { monitorId, nombre, apellidos, email };
  await crearMonitorRepository(monitor);
  return monitor;
}

export function listarMonitoresService() {
  return listarMonitoresRepository();
}
