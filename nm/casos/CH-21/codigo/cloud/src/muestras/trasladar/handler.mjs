import { trasladarMuestraService } from './service.mjs';

export async function handler(event) {
  const muestraId = Number(event.pathParameters.muestraId);
  const { laboratorioId } = JSON.parse(event.body);
  const resultado = await trasladarMuestraService(muestraId, laboratorioId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
