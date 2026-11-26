import { asignarRestauradorService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const piezaId = Number(event.pathParameters.piezaId);
  const { restauradorId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarRestauradorService(piezaId, restauradorId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El restaurador ya está asignado a esa pieza' }) };
    }
    throw error;
  }
}
