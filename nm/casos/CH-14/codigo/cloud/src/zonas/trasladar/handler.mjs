import { trasladarZonaService } from './service.mjs';

export async function handler(event) {
  const zonaId = Number(event.pathParameters.zonaId);
  const { parqueId } = JSON.parse(event.body);
  const resultado = await trasladarZonaService(zonaId, parqueId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
