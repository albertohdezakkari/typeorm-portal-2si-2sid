import { asignarHuespedService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const reservaId = Number(event.pathParameters.reservaId);
  const { huespedId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarHuespedService(reservaId, huespedId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El huesped ya está asignado a esa reserva' }) };
    }
    throw error;
  }
}
