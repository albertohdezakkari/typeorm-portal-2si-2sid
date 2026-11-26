import { modificarPrecioCentimosService } from './service.mjs';

export async function handler(event) {
  const productoId = Number(event.pathParameters.productoId);
  const { precioCentimos } = JSON.parse(event.body);
  const resultado = await modificarPrecioCentimosService(productoId, precioCentimos);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
