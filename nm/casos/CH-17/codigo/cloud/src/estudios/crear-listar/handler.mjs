/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/estudios" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Estudio Prisma"}'
curl -i "$API_URL/estudios"
*/
// POST /estudios con JSON: {"nombre":"Estudio Prisma"}
// GET /estudios lista los registros y sus IDs.
import { crearEstudioService, listarEstudiosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const estudio = await crearEstudioService(nombre);
  return { statusCode: 201, body: JSON.stringify(estudio) };
}

export async function listarHandler() {
  const estudios = await listarEstudiosService();
  return { statusCode: 200, body: JSON.stringify(estudios) };
}