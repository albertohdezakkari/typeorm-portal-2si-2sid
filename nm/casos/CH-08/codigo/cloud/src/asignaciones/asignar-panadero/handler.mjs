import { asignarPanaderoService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const productoId = Number(event.pathParameters.productoId);
  const { panaderoId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarPanaderoService(productoId, panaderoId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El panadero ya está asignado a ese producto' }) };
    }
    throw error;
  }
}
