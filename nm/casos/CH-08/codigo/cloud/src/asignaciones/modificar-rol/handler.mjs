import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const productoId = Number(event.pathParameters.productoId);
  const panaderoId = Number(event.pathParameters.panaderoId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(productoId, panaderoId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
