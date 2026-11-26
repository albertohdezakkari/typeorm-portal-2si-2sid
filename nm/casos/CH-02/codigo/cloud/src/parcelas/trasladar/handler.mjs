import { trasladarParcelaService } from './service.mjs';

export async function handler(event) {
  const parcelaId = Number(event.pathParameters.parcelaId);
  const { huertoId } = JSON.parse(event.body);
  const resultado = await trasladarParcelaService(parcelaId, huertoId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
