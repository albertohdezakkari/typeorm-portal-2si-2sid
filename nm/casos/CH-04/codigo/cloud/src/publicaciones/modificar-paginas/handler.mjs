import { modificarPaginasService } from './service.mjs';

export async function handler(event) {
  const publicacionId = Number(event.pathParameters.publicacionId);
  const { paginas } = JSON.parse(event.body);
  const resultado = await modificarPaginasService(publicacionId, paginas);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
