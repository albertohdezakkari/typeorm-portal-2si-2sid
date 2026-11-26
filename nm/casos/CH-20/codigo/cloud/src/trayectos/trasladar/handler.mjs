import { trasladarTrayectoService } from './service.mjs';

export async function handler(event) {
  const trayectoId = Number(event.pathParameters.trayectoId);
  const { estacionId } = JSON.parse(event.body);
  const resultado = await trasladarTrayectoService(trayectoId, estacionId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
