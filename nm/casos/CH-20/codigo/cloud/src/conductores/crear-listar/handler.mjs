import { crearConductorService, listarConductoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const conductor = await crearConductorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(conductor) };
}

export async function listarHandler() {
  const conductores = await listarConductoresService();
  return { statusCode: 200, body: JSON.stringify(conductores) };
}
