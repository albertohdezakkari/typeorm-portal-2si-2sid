import { asignarCuidadorService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const animalId = Number(event.pathParameters.animalId);
  const { cuidadorId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarCuidadorService(animalId, cuidadorId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El cuidador ya está asignado a ese animal' }) };
    }
    throw error;
  }
}
