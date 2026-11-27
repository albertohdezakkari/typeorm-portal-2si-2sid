/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/tiendas" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Tienda Esquina"}'
curl -i "$API_URL/tiendas"
*/
// POST /tiendas con JSON: {"nombre":"Tienda Esquina"}
// GET /tiendas lista los registros y sus IDs.
import { crearTiendaService, listarTiendasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const tienda = await crearTiendaService(nombre);
  return { statusCode: 201, body: JSON.stringify(tienda) };
}

export async function listarHandler() {
  const tiendas = await listarTiendasService();
  return { statusCode: 200, body: JSON.stringify(tiendas) };
}