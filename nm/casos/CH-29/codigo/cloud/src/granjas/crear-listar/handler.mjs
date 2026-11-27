/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/granjas" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Granja del Sol"}'
curl -i "$API_URL/granjas"
*/
// POST /granjas con JSON: {"nombre":"Granja del Sol"}
// GET /granjas lista los registros y sus IDs.
import { crearGranjaService, listarGranjasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const granja = await crearGranjaService(nombre);
  return { statusCode: 201, body: JSON.stringify(granja) };
}

export async function listarHandler() {
  const granjas = await listarGranjasService();
  return { statusCode: 200, body: JSON.stringify(granjas) };
}