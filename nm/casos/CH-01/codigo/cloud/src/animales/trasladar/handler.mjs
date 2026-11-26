import { trasladarAnimalService } from './service.mjs';

export async function handler(event) {
  const animalId = Number(event.pathParameters.animalId);
  const { refugioId } = JSON.parse(event.body);
  const resultado = await trasladarAnimalService(animalId, refugioId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
