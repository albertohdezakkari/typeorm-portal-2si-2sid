/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/parques" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Parque del Agua"}'
curl -i "$API_URL/parques"
*/
// POST /parques con JSON: {"nombre":"Parque del Agua"}
// GET /parques lista los registros y sus IDs.
import { crearParqueService, listarParquesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const parque = await crearParqueService(nombre);
  return { statusCode: 201, body: JSON.stringify(parque) };
}

export async function listarHandler() {
  const parques = await listarParquesService();
  return { statusCode: 200, body: JSON.stringify(parques) };
}