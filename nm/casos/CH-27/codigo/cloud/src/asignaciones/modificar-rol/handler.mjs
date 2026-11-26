import { modificarRolService } from './service.mjs';

export async function handler(event) {
  const plazaId = Number(event.pathParameters.plazaId);
  const tecnicoId = Number(event.pathParameters.tecnicoId);
  const { rol } = JSON.parse(event.body);
  try {
    const asignacion = await modificarRolService(plazaId, tecnicoId, rol);
    return { statusCode: 200, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 404, body: JSON.stringify({ message: 'No existe la asignación' }) };
    }
    throw error;
  }
}
