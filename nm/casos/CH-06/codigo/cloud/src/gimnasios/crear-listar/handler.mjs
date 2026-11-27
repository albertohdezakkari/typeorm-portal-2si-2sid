/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/gimnasios" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Gimnasio Norte"}'
curl -i "$API_URL/gimnasios"
*/
// POST /gimnasios con JSON: {"nombre":"Gimnasio Norte"}
// GET /gimnasios lista los registros y sus IDs.
import { crearGimnasioService, listarGimnasiosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const gimnasio = await crearGimnasioService(nombre);
  return { statusCode: 201, body: JSON.stringify(gimnasio) };
}

export async function listarHandler() {
  const gimnasios = await listarGimnasiosService();
  return { statusCode: 200, body: JSON.stringify(gimnasios) };
}