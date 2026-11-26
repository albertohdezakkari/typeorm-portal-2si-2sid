import { trasladarProductoService } from './service.mjs';

export async function handler(event) {
  const productoId = Number(event.pathParameters.productoId);
  const { panaderiaId } = JSON.parse(event.body);
  const resultado = await trasladarProductoService(productoId, panaderiaId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
