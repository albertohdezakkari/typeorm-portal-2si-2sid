import { asignarTripulanteService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const embarcacionId = Number(event.pathParameters.embarcacionId);
  const { tripulanteId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarTripulanteService(embarcacionId, tripulanteId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El tripulante ya está asignado a esa embarcacion' }) };
    }
    throw error;
  }
}
