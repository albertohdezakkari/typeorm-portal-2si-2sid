/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/escuelas" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Escuela Puente"}'
curl -i "$API_URL/escuelas"
*/
// POST /escuelas con JSON: {"nombre":"Escuela Puente"}
// GET /escuelas lista los registros y sus IDs.
import { crearEscuelaService, listarEscuelasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const escuela = await crearEscuelaService(nombre);
  return { statusCode: 201, body: JSON.stringify(escuela) };
}

export async function listarHandler() {
  const escuelas = await listarEscuelasService();
  return { statusCode: 200, body: JSON.stringify(escuelas) };
}