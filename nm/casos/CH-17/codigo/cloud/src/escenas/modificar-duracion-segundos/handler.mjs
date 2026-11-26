import { modificarDuracionSegundosService } from './service.mjs';

export async function handler(event) {
  const escenaId = Number(event.pathParameters.escenaId);
  const { duracionSegundos } = JSON.parse(event.body);
  const resultado = await modificarDuracionSegundosService(escenaId, duracionSegundos);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
