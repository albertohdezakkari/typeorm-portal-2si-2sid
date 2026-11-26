import { modificarPlazasService } from './service.mjs';

export async function handler(event) {
  const actividadId = Number(event.pathParameters.actividadId);
  const { plazas } = JSON.parse(event.body);
  const resultado = await modificarPlazasService(actividadId, plazas);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
