import { asignarEntrenadorService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const pistaId = Number(event.pathParameters.pistaId);
  const { entrenadorId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarEntrenadorService(pistaId, entrenadorId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El entrenador ya está asignado a esa pista' }) };
    }
    throw error;
  }
}
