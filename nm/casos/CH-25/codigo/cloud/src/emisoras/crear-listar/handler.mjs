/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/emisoras" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Radio Horizonte"}'
curl -i "$API_URL/emisoras"
*/
// POST /emisoras con JSON: {"nombre":"Radio Horizonte"}
// GET /emisoras lista los registros y sus IDs.
import { crearEmisoraService, listarEmisorasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const emisora = await crearEmisoraService(nombre);
  return { statusCode: 201, body: JSON.stringify(emisora) };
}

export async function listarHandler() {
  const emisoras = await listarEmisorasService();
  return { statusCode: 200, body: JSON.stringify(emisoras) };
}