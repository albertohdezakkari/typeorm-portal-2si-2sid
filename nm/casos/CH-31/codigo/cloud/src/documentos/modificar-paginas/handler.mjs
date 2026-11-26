import { modificarPaginasService } from './service.mjs';

export async function handler(event) {
  const documentoId = Number(event.pathParameters.documentoId);
  const { paginas } = JSON.parse(event.body);
  const resultado = await modificarPaginasService(documentoId, paginas);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
