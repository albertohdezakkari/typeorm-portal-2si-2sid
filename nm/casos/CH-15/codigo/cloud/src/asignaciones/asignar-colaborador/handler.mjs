import { asignarColaboradorService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const proyectoId = Number(event.pathParameters.proyectoId);
  const { colaboradorId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarColaboradorService(proyectoId, colaboradorId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El colaborador ya está asignado a ese proyecto' }) };
    }
    throw error;
  }
}
