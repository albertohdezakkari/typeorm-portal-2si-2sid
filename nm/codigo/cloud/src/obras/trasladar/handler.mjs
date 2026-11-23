import { trasladarObraService } from './service.mjs';

export async function handler(event) {
  const obraId = Number(event.pathParameters.obraId);
  const { ayuntamientoId } = JSON.parse(event.body);
  const resultado = await trasladarObraService(obraId, ayuntamientoId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
