import { modificarSuperficieM2Service } from './service.mjs';

export async function handler(event) {
  const plazaId = Number(event.pathParameters.plazaId);
  const { superficieM2 } = JSON.parse(event.body);
  const resultado = await modificarSuperficieM2Service(plazaId, superficieM2);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
