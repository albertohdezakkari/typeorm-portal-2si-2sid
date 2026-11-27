/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/talleres" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Taller Norte"}'
curl -i "$API_URL/talleres"
*/
// POST /talleres con JSON: {"nombre":"Taller Norte"}
// GET /talleres lista los registros y sus IDs.
import { crearTallerService, listarTalleresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const taller = await crearTallerService(nombre);
  return { statusCode: 201, body: JSON.stringify(taller) };
}

export async function listarHandler() {
  const talleres = await listarTalleresService();
  return { statusCode: 200, body: JSON.stringify(talleres) };
}