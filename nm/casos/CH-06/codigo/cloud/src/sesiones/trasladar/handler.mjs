import { trasladarSesionService } from './service.mjs';

export async function handler(event) {
  const sesionId = Number(event.pathParameters.sesionId);
  const { gimnasioId } = JSON.parse(event.body);
  const resultado = await trasladarSesionService(sesionId, gimnasioId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
