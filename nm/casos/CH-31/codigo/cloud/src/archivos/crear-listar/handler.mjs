/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/archivos" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Archivo Municipal"}'
curl -i "$API_URL/archivos"
*/
// POST /archivos con JSON: {"nombre":"Archivo Municipal"}
// GET /archivos lista los registros y sus IDs.
import { crearArchivoService, listarArchivosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const archivo = await crearArchivoService(nombre);
  return { statusCode: 201, body: JSON.stringify(archivo) };
}

export async function listarHandler() {
  const archivos = await listarArchivosService();
  return { statusCode: 200, body: JSON.stringify(archivos) };
}