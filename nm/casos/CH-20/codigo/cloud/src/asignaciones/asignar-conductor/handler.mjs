import { asignarConductorService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const trayectoId = Number(event.pathParameters.trayectoId);
  const { conductorId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarConductorService(trayectoId, conductorId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El conductor ya está asignado a ese trayecto' }) };
    }
    throw error;
  }
}
