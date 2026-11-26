import { asignarTecnicoService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const proyeccionId = Number(event.pathParameters.proyeccionId);
  const { tecnicoId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarTecnicoService(proyeccionId, tecnicoId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El tecnico ya está asignado a esa proyeccion' }) };
    }
    throw error;
  }
}
