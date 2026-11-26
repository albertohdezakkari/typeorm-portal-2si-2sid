import { modificarCapacidadService } from './service.mjs';

export async function handler(event) {
  const zonaId = Number(event.pathParameters.zonaId);
  const { capacidad } = JSON.parse(event.body);
  const resultado = await modificarCapacidadService(zonaId, capacidad);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
