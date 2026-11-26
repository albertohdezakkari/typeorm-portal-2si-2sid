import { trasladarArticuloService } from './service.mjs';

export async function handler(event) {
  const articuloId = Number(event.pathParameters.articuloId);
  const { tiendaId } = JSON.parse(event.body);
  const resultado = await trasladarArticuloService(articuloId, tiendaId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
