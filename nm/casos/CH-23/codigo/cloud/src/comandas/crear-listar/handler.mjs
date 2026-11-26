import { crearComandaService, listarComandasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, importeCentimos, cafeteriaId } = JSON.parse(event.body);
  const comanda = await crearComandaService(nombre, importeCentimos, cafeteriaId);
  return { statusCode: 201, body: JSON.stringify(comanda) };
}

export async function listarHandler() {
  const comandas = await listarComandasService();
  return { statusCode: 200, body: JSON.stringify(comandas) };
}
