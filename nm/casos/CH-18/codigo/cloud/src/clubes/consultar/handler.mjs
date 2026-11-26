import { consultarClubService } from './service.mjs';

export async function handler(event) {
  const clubId = Number(event.pathParameters.clubId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarClubService(clubId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
