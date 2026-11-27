/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/viveros" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Vivero Raíz"}'
curl -i "$API_URL/viveros"
*/
// POST /viveros con JSON: {"nombre":"Vivero Raíz"}
// GET /viveros lista los registros y sus IDs.
import { crearViveroService, listarViverosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const vivero = await crearViveroService(nombre);
  return { statusCode: 201, body: JSON.stringify(vivero) };
}

export async function listarHandler() {
  const viveros = await listarViverosService();
  return { statusCode: 200, body: JSON.stringify(viveros) };
}