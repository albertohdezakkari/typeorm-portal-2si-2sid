import { asignarGuiaService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const excursionId = Number(event.pathParameters.excursionId);
  const { guiaId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarGuiaService(excursionId, guiaId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El guia ya está asignado a esa excursion' }) };
    }
    throw error;
  }
}
