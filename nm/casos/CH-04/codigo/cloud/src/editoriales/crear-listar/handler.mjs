/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/editoriales" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Editorial Roble"}'
curl -i "$API_URL/editoriales"
*/
// POST /editoriales con JSON: {"nombre":"Editorial Roble"}
// GET /editoriales lista los registros y sus IDs.
import { crearEditorialService, listarEditorialesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const editorial = await crearEditorialService(nombre);
  return { statusCode: 201, body: JSON.stringify(editorial) };
}

export async function listarHandler() {
  const editoriales = await listarEditorialesService();
  return { statusCode: 200, body: JSON.stringify(editoriales) };
}