import { crearObraService, listarObrasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, presupuestoEuros, ayuntamientoId } = JSON.parse(event.body);
  const obra = await crearObraService(nombre, presupuestoEuros, ayuntamientoId);
  return { statusCode: 201, body: JSON.stringify(obra) };
}

export async function listarHandler() {
  const obras = await listarObrasService();
  return { statusCode: 200, body: JSON.stringify(obras) };
}
