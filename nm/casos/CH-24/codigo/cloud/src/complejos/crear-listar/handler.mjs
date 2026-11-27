/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/complejos" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Complejo Municipal"}'
curl -i "$API_URL/complejos"
*/
// POST /complejos con JSON: {"nombre":"Complejo Municipal"}
// GET /complejos lista los registros y sus IDs.
import { crearComplejoService, listarComplejosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const complejo = await crearComplejoService(nombre);
  return { statusCode: 201, body: JSON.stringify(complejo) };
}

export async function listarHandler() {
  const complejos = await listarComplejosService();
  return { statusCode: 200, body: JSON.stringify(complejos) };
}