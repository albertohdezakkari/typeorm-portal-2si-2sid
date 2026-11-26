import { trasladarLoteService } from './service.mjs';

export async function handler(event) {
  const loteId = Number(event.pathParameters.loteId);
  const { cooperativaId } = JSON.parse(event.body);
  const resultado = await trasladarLoteService(loteId, cooperativaId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
