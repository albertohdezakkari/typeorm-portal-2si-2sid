/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/estaciones" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Estación Central"}'
curl -i "$API_URL/estaciones"
*/
// POST /estaciones con JSON: {"nombre":"Estación Central"}
// GET /estaciones lista los registros y sus IDs.
import { crearEstacionService, listarEstacionesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const estacion = await crearEstacionService(nombre);
  return { statusCode: 201, body: JSON.stringify(estacion) };
}

export async function listarHandler() {
  const estaciones = await listarEstacionesService();
  return { statusCode: 200, body: JSON.stringify(estaciones) };
}