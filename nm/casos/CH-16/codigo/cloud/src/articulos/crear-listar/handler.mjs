import { crearArticuloService, listarArticulosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, stock, tiendaId } = JSON.parse(event.body);
  const articulo = await crearArticuloService(nombre, stock, tiendaId);
  return { statusCode: 201, body: JSON.stringify(articulo) };
}

export async function listarHandler() {
  const articulos = await listarArticulosService();
  return { statusCode: 200, body: JSON.stringify(articulos) };
}
