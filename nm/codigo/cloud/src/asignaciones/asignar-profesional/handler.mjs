import { asignarProfesionalService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const obraId = Number(event.pathParameters.obraId);
  const { profesionalId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarProfesionalService(obraId, profesionalId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El profesional ya está asignado a esa obra' }) };
    }
    throw error;
  }
}
