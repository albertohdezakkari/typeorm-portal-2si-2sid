/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/refugios" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Refugio Norte"}'
curl -i "$API_URL/refugios"
*/
// POST /refugios con JSON: {"nombre":"Refugio Norte"}
// GET /refugios lista los registros y sus IDs.
import { crearRefugioService, listarRefugiosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const refugio = await crearRefugioService(nombre);
  return { statusCode: 201, body: JSON.stringify(refugio) };
}

export async function listarHandler() {
  const refugios = await listarRefugiosService();
  return { statusCode: 200, body: JSON.stringify(refugios) };
}