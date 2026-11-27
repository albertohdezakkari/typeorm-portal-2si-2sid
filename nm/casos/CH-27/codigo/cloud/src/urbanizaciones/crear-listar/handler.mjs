/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/urbanizaciones" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Urbanización Jardín"}'
curl -i "$API_URL/urbanizaciones"
*/
// POST /urbanizaciones con JSON: {"nombre":"Urbanización Jardín"}
// GET /urbanizaciones lista los registros y sus IDs.
import { crearUrbanizacionService, listarUrbanizacionesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const urbanizacion = await crearUrbanizacionService(nombre);
  return { statusCode: 201, body: JSON.stringify(urbanizacion) };
}

export async function listarHandler() {
  const urbanizaciones = await listarUrbanizacionesService();
  return { statusCode: 200, body: JSON.stringify(urbanizaciones) };
}