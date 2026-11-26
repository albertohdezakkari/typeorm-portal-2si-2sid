import { trasladarPiezaService } from './service.mjs';

export async function handler(event) {
  const piezaId = Number(event.pathParameters.piezaId);
  const { museoId } = JSON.parse(event.body);
  const resultado = await trasladarPiezaService(piezaId, museoId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
