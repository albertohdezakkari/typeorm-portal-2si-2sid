/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/panaderias" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Panadería Espiga"}'
curl -i "$API_URL/panaderias"
*/
// POST /panaderias con JSON: {"nombre":"Panadería Espiga"}
// GET /panaderias lista los registros y sus IDs.
import { crearPanaderiaService, listarPanaderiasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const panaderia = await crearPanaderiaService(nombre);
  return { statusCode: 201, body: JSON.stringify(panaderia) };
}

export async function listarHandler() {
  const panaderias = await listarPanaderiasService();
  return { statusCode: 200, body: JSON.stringify(panaderias) };
}