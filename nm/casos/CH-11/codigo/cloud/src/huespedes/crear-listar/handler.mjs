import { crearHuespedService, listarHuespedesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const huesped = await crearHuespedService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(huesped) };
}

export async function listarHandler() {
  const huespedes = await listarHuespedesService();
  return { statusCode: 200, body: JSON.stringify(huespedes) };
}
