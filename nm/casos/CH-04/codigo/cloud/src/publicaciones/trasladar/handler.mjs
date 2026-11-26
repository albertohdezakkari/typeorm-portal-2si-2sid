import { trasladarPublicacionService } from './service.mjs';

export async function handler(event) {
  const publicacionId = Number(event.pathParameters.publicacionId);
  const { editorialId } = JSON.parse(event.body);
  const resultado = await trasladarPublicacionService(publicacionId, editorialId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
