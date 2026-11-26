import { asignarActorService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const escenaId = Number(event.pathParameters.escenaId);
  const { actorId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarActorService(escenaId, actorId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El actor ya está asignado a esa escena' }) };
    }
    throw error;
  }
}
