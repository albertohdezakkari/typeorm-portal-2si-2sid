/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/teatros" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Teatro Aurora"}'
curl -i "$API_URL/teatros"
*/
// POST /teatros con JSON: {"nombre":"Teatro Aurora"}
// GET /teatros lista los registros y sus IDs.
import { crearTeatroService, listarTeatrosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const teatro = await crearTeatroService(nombre);
  return { statusCode: 201, body: JSON.stringify(teatro) };
}

export async function listarHandler() {
  const teatros = await listarTeatrosService();
  return { statusCode: 200, body: JSON.stringify(teatros) };
}