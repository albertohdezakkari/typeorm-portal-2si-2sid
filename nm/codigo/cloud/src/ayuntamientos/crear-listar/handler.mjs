/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/ayuntamientos" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Ayuntamiento del Río"}'
curl -i "$API_URL/ayuntamientos"
*/
// POST /ayuntamientos con JSON: {"nombre":"Ayuntamiento del Río"}
// GET /ayuntamientos lista los registros y sus IDs.
import { crearAyuntamientoService, listarAyuntamientosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const ayuntamiento = await crearAyuntamientoService(nombre);
  return { statusCode: 201, body: JSON.stringify(ayuntamiento) };
}

export async function listarHandler() {
  const ayuntamientos = await listarAyuntamientosService();
  return { statusCode: 200, body: JSON.stringify(ayuntamientos) };
}