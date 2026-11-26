import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const proyectoId = Number(event.pathParameters.proyectoId);
  const colaboradorId = Number(event.pathParameters.colaboradorId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(proyectoId, colaboradorId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
