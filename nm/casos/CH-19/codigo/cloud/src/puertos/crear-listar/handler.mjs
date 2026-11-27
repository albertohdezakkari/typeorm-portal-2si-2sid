/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/puertos" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Puerto del Mar"}'
curl -i "$API_URL/puertos"
*/
// POST /puertos con JSON: {"nombre":"Puerto del Mar"}
// GET /puertos lista los registros y sus IDs.
import { crearPuertoService, listarPuertosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const puerto = await crearPuertoService(nombre);
  return { statusCode: 201, body: JSON.stringify(puerto) };
}

export async function listarHandler() {
  const puertos = await listarPuertosService();
  return { statusCode: 200, body: JSON.stringify(puertos) };
}