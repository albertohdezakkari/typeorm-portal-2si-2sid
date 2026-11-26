import { asignarMecanicoService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const reparacionId = Number(event.pathParameters.reparacionId);
  const { mecanicoId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarMecanicoService(reparacionId, mecanicoId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El mecanico ya está asignado a esa reparacion' }) };
    }
    throw error;
  }
}
