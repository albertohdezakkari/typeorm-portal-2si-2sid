import { trasladarProyeccionService } from './service.mjs';

export async function handler(event) {
  const proyeccionId = Number(event.pathParameters.proyeccionId);
  const { cineId } = JSON.parse(event.body);
  const resultado = await trasladarProyeccionService(proyeccionId, cineId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
