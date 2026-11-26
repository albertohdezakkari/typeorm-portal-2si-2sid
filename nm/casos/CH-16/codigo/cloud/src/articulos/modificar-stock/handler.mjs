import { modificarStockService } from './service.mjs';

export async function handler(event) {
  const articuloId = Number(event.pathParameters.articuloId);
  const { stock } = JSON.parse(event.body);
  const resultado = await modificarStockService(articuloId, stock);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
