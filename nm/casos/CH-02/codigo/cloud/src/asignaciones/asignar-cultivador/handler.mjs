import { asignarCultivadorService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const parcelaId = Number(event.pathParameters.parcelaId);
  const { cultivadorId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarCultivadorService(parcelaId, cultivadorId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El cultivador ya está asignado a esa parcela' }) };
    }
    throw error;
  }
}
