import { asignarArtistaService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const actuacionId = Number(event.pathParameters.actuacionId);
  const { artistaId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarArtistaService(actuacionId, artistaId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El artista ya está asignado a esa actuacion' }) };
    }
    throw error;
  }
}
