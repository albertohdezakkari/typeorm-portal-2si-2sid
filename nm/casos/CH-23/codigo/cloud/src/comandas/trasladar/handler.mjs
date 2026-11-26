import { trasladarComandaService } from './service.mjs';

export async function handler(event) {
  const comandaId = Number(event.pathParameters.comandaId);
  const { cafeteriaId } = JSON.parse(event.body);
  const resultado = await trasladarComandaService(comandaId, cafeteriaId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
