import { trasladarActuacionService } from './service.mjs';

export async function handler(event) {
  const actuacionId = Number(event.pathParameters.actuacionId);
  const { festivalId } = JSON.parse(event.body);
  const resultado = await trasladarActuacionService(actuacionId, festivalId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
