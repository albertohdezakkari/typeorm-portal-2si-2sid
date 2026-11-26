import { modificarCapacidadService } from './service.mjs';

export async function handler(event) {
  const aulaId = Number(event.pathParameters.aulaId);
  const { capacidad } = JSON.parse(event.body);
  const resultado = await modificarCapacidadService(aulaId, capacidad);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
