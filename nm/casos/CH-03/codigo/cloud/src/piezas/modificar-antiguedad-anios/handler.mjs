import { modificarAntiguedadAniosService } from './service.mjs';

export async function handler(event) {
  const piezaId = Number(event.pathParameters.piezaId);
  const { antiguedadAnios } = JSON.parse(event.body);
  const resultado = await modificarAntiguedadAniosService(piezaId, antiguedadAnios);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
