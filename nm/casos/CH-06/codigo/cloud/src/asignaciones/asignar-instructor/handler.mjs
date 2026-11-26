import { asignarInstructorService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const sesionId = Number(event.pathParameters.sesionId);
  const { instructorId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarInstructorService(sesionId, instructorId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El instructor ya está asignado a esa sesion' }) };
    }
    throw error;
  }
}
