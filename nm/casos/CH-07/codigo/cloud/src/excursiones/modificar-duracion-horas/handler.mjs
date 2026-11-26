import { modificarDuracionHorasService } from './service.mjs';

export async function handler(event) {
  const excursionId = Number(event.pathParameters.excursionId);
  const { duracionHoras } = JSON.parse(event.body);
  const resultado = await modificarDuracionHorasService(excursionId, duracionHoras);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
