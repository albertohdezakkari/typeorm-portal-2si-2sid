import { crearPlazaService, listarPlazasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, superficieM2, urbanizacionId } = JSON.parse(event.body);
  const plaza = await crearPlazaService(nombre, superficieM2, urbanizacionId);
  return { statusCode: 201, body: JSON.stringify(plaza) };
}

export async function listarHandler() {
  const plazas = await listarPlazasService();
  return { statusCode: 200, body: JSON.stringify(plazas) };
}
