import { modificarCosteCentimosService } from './service.mjs';

export async function handler(event) {
  const reparacionId = Number(event.pathParameters.reparacionId);
  const { costeCentimos } = JSON.parse(event.body);
  const resultado = await modificarCosteCentimosService(reparacionId, costeCentimos);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
