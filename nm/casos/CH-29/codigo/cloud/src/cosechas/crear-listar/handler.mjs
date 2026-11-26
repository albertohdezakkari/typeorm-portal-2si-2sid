import { crearCosechaService, listarCosechasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, kilos, granjaId } = JSON.parse(event.body);
  const cosecha = await crearCosechaService(nombre, kilos, granjaId);
  return { statusCode: 201, body: JSON.stringify(cosecha) };
}

export async function listarHandler() {
  const cosechas = await listarCosechasService();
  return { statusCode: 200, body: JSON.stringify(cosechas) };
}
