import { crearMuestraService, listarMuestrasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, cantidadMl, laboratorioId } = JSON.parse(event.body);
  const muestra = await crearMuestraService(nombre, cantidadMl, laboratorioId);
  return { statusCode: 201, body: JSON.stringify(muestra) };
}

export async function listarHandler() {
  const muestras = await listarMuestrasService();
  return { statusCode: 200, body: JSON.stringify(muestras) };
}
