/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/festivales" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Festival del Sol"}'
curl -i "$API_URL/festivales"
*/
// POST /festivales con JSON: {"nombre":"Festival del Sol"}
// GET /festivales lista los registros y sus IDs.
import { crearFestivalService, listarFestivalesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const festival = await crearFestivalService(nombre);
  return { statusCode: 201, body: JSON.stringify(festival) };
}

export async function listarHandler() {
  const festivales = await listarFestivalesService();
  return { statusCode: 200, body: JSON.stringify(festivales) };
}