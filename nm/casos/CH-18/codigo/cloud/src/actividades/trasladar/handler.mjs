import { trasladarActividadService } from './service.mjs';

export async function handler(event) {
  const actividadId = Number(event.pathParameters.actividadId);
  const { clubId } = JSON.parse(event.body);
  const resultado = await trasladarActividadService(actividadId, clubId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
