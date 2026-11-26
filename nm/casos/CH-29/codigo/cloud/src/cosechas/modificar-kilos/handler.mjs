import { modificarKilosService } from './service.mjs';

export async function handler(event) {
  const cosechaId = Number(event.pathParameters.cosechaId);
  const { kilos } = JSON.parse(event.body);
  const resultado = await modificarKilosService(cosechaId, kilos);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
