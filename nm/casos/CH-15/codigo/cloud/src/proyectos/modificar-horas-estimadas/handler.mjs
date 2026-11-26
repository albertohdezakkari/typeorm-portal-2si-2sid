import { modificarHorasEstimadasService } from './service.mjs';

export async function handler(event) {
  const proyectoId = Number(event.pathParameters.proyectoId);
  const { horasEstimadas } = JSON.parse(event.body);
  const resultado = await modificarHorasEstimadasService(proyectoId, horasEstimadas);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
