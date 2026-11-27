/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/cines" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Cine Alameda"}'
curl -i "$API_URL/cines"
*/
// POST /cines con JSON: {"nombre":"Cine Alameda"}
// GET /cines lista los registros y sus IDs.
import { crearCineService, listarCinesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const cine = await crearCineService(nombre);
  return { statusCode: 201, body: JSON.stringify(cine) };
}

export async function listarHandler() {
  const cines = await listarCinesService();
  return { statusCode: 200, body: JSON.stringify(cines) };
}