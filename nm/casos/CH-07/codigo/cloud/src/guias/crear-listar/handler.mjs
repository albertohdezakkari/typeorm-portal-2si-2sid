import { crearGuiaService, listarGuiasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const guia = await crearGuiaService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(guia) };
}

export async function listarHandler() {
  const guias = await listarGuiasService();
  return { statusCode: 200, body: JSON.stringify(guias) };
}
