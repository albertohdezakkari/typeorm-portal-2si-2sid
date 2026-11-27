/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/huertos" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Huerto del Río"}'
curl -i "$API_URL/huertos"
*/
// POST /huertos con JSON: {"nombre":"Huerto del Río"}
// GET /huertos lista los registros y sus IDs.
import { crearHuertoService, listarHuertosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const huerto = await crearHuertoService(nombre);
  return { statusCode: 201, body: JSON.stringify(huerto) };
}

export async function listarHandler() {
  const huertos = await listarHuertosService();
  return { statusCode: 200, body: JSON.stringify(huertos) };
}