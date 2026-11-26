import { trasladarExcursionService } from './service.mjs';

export async function handler(event) {
  const excursionId = Number(event.pathParameters.excursionId);
  const { agenciaId } = JSON.parse(event.body);
  const resultado = await trasladarExcursionService(excursionId, agenciaId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
