import { asignarEnfermeroService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const habitacionId = Number(event.pathParameters.habitacionId);
  const { enfermeroId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarEnfermeroService(habitacionId, enfermeroId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El enfermero ya está asignado a esa habitacion' }) };
    }
    throw error;
  }
}
