import { modificarPlazasService } from './service.mjs';

export async function handler(event) {
  const sesionId = Number(event.pathParameters.sesionId);
  const { plazas } = JSON.parse(event.body);
  const resultado = await modificarPlazasService(sesionId, plazas);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
