import { modificarEdadMesesService } from './service.mjs';

export async function handler(event) {
  const animalId = Number(event.pathParameters.animalId);
  const { edadMeses } = JSON.parse(event.body);
  const resultado = await modificarEdadMesesService(animalId, edadMeses);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
