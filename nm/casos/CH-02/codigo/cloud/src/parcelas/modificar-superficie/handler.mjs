import { modificarSuperficieService } from './service.mjs';

export async function handler(event) {
  const parcelaId = Number(event.pathParameters.parcelaId);
  const { superficieM2 } = JSON.parse(event.body);
  const resultado = await modificarSuperficieService(parcelaId, superficieM2);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
