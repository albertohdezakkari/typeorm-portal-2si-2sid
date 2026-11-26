import { modificarEsloraMetrosService } from './service.mjs';

export async function handler(event) {
  const embarcacionId = Number(event.pathParameters.embarcacionId);
  const { esloraMetros } = JSON.parse(event.body);
  const resultado = await modificarEsloraMetrosService(embarcacionId, esloraMetros);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
