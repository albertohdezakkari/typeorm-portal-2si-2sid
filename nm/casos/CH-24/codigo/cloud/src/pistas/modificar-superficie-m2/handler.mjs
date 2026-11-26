import { modificarSuperficieM2Service } from './service.mjs';

export async function handler(event) {
  const pistaId = Number(event.pathParameters.pistaId);
  const { superficieM2 } = JSON.parse(event.body);
  const resultado = await modificarSuperficieM2Service(pistaId, superficieM2);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
