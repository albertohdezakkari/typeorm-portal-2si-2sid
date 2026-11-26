import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const animalId = Number(event.pathParameters.animalId);
  const cuidadorId = Number(event.pathParameters.cuidadorId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(animalId, cuidadorId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
