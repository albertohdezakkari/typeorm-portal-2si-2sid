/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/agencias" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Agencia Horizonte"}'
curl -i "$API_URL/agencias"
*/
// POST /agencias con JSON: {"nombre":"Agencia Horizonte"}
// GET /agencias lista los registros y sus IDs.
import { crearAgenciaService, listarAgenciasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const agencia = await crearAgenciaService(nombre);
  return { statusCode: 201, body: JSON.stringify(agencia) };
}

export async function listarHandler() {
  const agencias = await listarAgenciasService();
  return { statusCode: 200, body: JSON.stringify(agencias) };
}