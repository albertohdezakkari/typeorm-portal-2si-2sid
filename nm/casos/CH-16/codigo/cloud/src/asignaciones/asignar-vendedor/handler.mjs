import { asignarVendedorService, ReferenciaInexistenteError } from './service.mjs';

export async function handler(event) {
  const articuloId = Number(event.pathParameters.articuloId);
  const { vendedorId, rol } = JSON.parse(event.body);
  try {
    const asignacion = await asignarVendedorService(articuloId, vendedorId, rol);
    return { statusCode: 201, body: JSON.stringify(asignacion) };
  } catch (error) {
    if (error instanceof ReferenciaInexistenteError) {
      return { statusCode: 404, body: JSON.stringify({ message: error.message }) };
    }
    if (error.name === 'ConditionalCheckFailedException') {
      return { statusCode: 409, body: JSON.stringify({ message: 'El vendedor ya está asignado a ese articulo' }) };
    }
    throw error;
  }
}
