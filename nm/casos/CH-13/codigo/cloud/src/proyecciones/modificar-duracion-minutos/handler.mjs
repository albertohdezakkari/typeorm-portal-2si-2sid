import { modificarDuracionMinutosService } from './service.mjs';

export async function handler(event) {
  const proyeccionId = Number(event.pathParameters.proyeccionId);
  const { duracionMinutos } = JSON.parse(event.body);
  const resultado = await modificarDuracionMinutosService(proyeccionId, duracionMinutos);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
