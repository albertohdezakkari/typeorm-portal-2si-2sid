import { trasladarPlazaService } from './service.mjs';

export async function handler(event) {
  const plazaId = Number(event.pathParameters.plazaId);
  const { urbanizacionId } = JSON.parse(event.body);
  const resultado = await trasladarPlazaService(plazaId, urbanizacionId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
