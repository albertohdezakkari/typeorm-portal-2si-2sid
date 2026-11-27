/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/museos" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Museo del Barrio"}'
curl -i "$API_URL/museos"
*/
// POST /museos con JSON: {"nombre":"Museo del Barrio"}
// GET /museos lista los registros y sus IDs.
import { crearMuseoService, listarMuseosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const museo = await crearMuseoService(nombre);
  return { statusCode: 201, body: JSON.stringify(museo) };
}

export async function listarHandler() {
  const museos = await listarMuseosService();
  return { statusCode: 200, body: JSON.stringify(museos) };
}