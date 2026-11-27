/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/clubes" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Club Encuentro"}'
curl -i "$API_URL/clubes"
*/
// POST /clubes con JSON: {"nombre":"Club Encuentro"}
// GET /clubes lista los registros y sus IDs.
import { crearClubService, listarClubesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const club = await crearClubService(nombre);
  return { statusCode: 201, body: JSON.stringify(club) };
}

export async function listarHandler() {
  const clubes = await listarClubesService();
  return { statusCode: 200, body: JSON.stringify(clubes) };
}