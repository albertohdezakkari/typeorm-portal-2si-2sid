import { crearCultivadorService, listarCultivadoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const cultivador = await crearCultivadorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(cultivador) };
}

export async function listarHandler() {
  const cultivadores = await listarCultivadoresService();
  return { statusCode: 200, body: JSON.stringify(cultivadores) };
}
