import { trasladarCosechaService } from './service.mjs';

export async function handler(event) {
  const cosechaId = Number(event.pathParameters.cosechaId);
  const { granjaId } = JSON.parse(event.body);
  const resultado = await trasladarCosechaService(cosechaId, granjaId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
