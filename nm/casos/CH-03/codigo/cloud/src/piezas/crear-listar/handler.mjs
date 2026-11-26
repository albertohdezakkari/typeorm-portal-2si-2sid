import { crearPiezaService, listarPiezasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, antiguedadAnios, museoId } = JSON.parse(event.body);
  const pieza = await crearPiezaService(nombre, antiguedadAnios, museoId);
  return { statusCode: 201, body: JSON.stringify(pieza) };
}

export async function listarHandler() {
  const piezas = await listarPiezasService();
  return { statusCode: 200, body: JSON.stringify(piezas) };
}
