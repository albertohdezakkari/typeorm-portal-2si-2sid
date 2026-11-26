import { trasladarReparacionService } from './service.mjs';

export async function handler(event) {
  const reparacionId = Number(event.pathParameters.reparacionId);
  const { tallerId } = JSON.parse(event.body);
  const resultado = await trasladarReparacionService(reparacionId, tallerId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
