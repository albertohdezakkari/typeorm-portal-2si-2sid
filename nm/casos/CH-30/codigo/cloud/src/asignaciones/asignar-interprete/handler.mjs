import { asignarInterpreteService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const funcionId = Number(event.pathParameters.funcionId);
  const { interpreteId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarInterpreteService(funcionId, interpreteId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El interprete ya está asignado a esa funcion' }) };
    }
    throw error;
  }
}
