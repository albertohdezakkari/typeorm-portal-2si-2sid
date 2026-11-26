import { modificarDuracionMinutosService } from './service.mjs';

export async function handler(event) {
  const actuacionId = Number(event.pathParameters.actuacionId);
  const { duracionMinutos } = JSON.parse(event.body);
  const resultado = await modificarDuracionMinutosService(actuacionId, duracionMinutos);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
