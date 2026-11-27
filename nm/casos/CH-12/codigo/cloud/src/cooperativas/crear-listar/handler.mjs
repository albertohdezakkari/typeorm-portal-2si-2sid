/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/cooperativas" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Cooperativa Olivo"}'
curl -i "$API_URL/cooperativas"
*/
// POST /cooperativas con JSON: {"nombre":"Cooperativa Olivo"}
// GET /cooperativas lista los registros y sus IDs.
import { crearCooperativaService, listarCooperativasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const cooperativa = await crearCooperativaService(nombre);
  return { statusCode: 201, body: JSON.stringify(cooperativa) };
}

export async function listarHandler() {
  const cooperativas = await listarCooperativasService();
  return { statusCode: 200, body: JSON.stringify(cooperativas) };
}