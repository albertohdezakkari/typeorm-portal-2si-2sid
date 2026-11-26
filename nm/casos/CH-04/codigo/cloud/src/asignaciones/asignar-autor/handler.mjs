import { asignarAutorService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const publicacionId = Number(event.pathParameters.publicacionId);
  const { autorId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarAutorService(publicacionId, autorId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El autor ya está asignado a esa publicacion' }) };
    }
    throw error;
  }
}
