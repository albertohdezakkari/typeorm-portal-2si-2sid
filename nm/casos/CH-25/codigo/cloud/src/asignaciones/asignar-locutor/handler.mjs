import { asignarLocutorService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const programaId = Number(event.pathParameters.programaId);
  const { locutorId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarLocutorService(programaId, locutorId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El locutor ya está asignado a ese programa' }) };
    }
    throw error;
  }
}
