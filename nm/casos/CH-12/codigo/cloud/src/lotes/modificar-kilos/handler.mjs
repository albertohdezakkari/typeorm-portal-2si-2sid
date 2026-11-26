import { modificarKilosService } from './service.mjs';

export async function handler(event) {
  const loteId = Number(event.pathParameters.loteId);
  const { kilos } = JSON.parse(event.body);
  const resultado = await modificarKilosService(loteId, kilos);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
