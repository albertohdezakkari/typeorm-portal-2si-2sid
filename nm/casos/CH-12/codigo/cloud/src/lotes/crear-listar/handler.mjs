import { crearLoteService, listarLotesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, kilos, cooperativaId } = JSON.parse(event.body);
  const lote = await crearLoteService(nombre, kilos, cooperativaId);
  return { statusCode: 201, body: JSON.stringify(lote) };
}

export async function listarHandler() {
  const lotes = await listarLotesService();
  return { statusCode: 200, body: JSON.stringify(lotes) };
}
