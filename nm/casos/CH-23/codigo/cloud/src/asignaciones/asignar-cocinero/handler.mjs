import { asignarCocineroService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const comandaId = Number(event.pathParameters.comandaId);
  const { cocineroId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarCocineroService(comandaId, cocineroId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El cocinero ya está asignado a esa comanda' }) };
    }
    throw error;
  }
}
