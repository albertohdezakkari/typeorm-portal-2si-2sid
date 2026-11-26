import { asignarDocenteService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const aulaId = Number(event.pathParameters.aulaId);
  const { docenteId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarDocenteService(aulaId, docenteId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El docente ya está asignado a esa aula' }) };
    }
    throw error;
  }
}
