import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const articuloId = Number(event.pathParameters.articuloId);
  const vendedorId = Number(event.pathParameters.vendedorId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(articuloId, vendedorId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
