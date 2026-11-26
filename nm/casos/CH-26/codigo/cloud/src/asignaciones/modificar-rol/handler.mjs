import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const aulaId = Number(event.pathParameters.aulaId);
  const docenteId = Number(event.pathParameters.docenteId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(aulaId, docenteId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
