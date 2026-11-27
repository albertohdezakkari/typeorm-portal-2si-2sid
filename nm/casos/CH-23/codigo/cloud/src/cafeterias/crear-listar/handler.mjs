/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/cafeterias" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Cafetería Plaza"}'
curl -i "$API_URL/cafeterias"
*/
// POST /cafeterias con JSON: {"nombre":"Cafetería Plaza"}
// GET /cafeterias lista los registros y sus IDs.
import { crearCafeteriaService, listarCafeteriasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const cafeteria = await crearCafeteriaService(nombre);
  return { statusCode: 201, body: JSON.stringify(cafeteria) };
}

export async function listarHandler() {
  const cafeterias = await listarCafeteriasService();
  return { statusCode: 200, body: JSON.stringify(cafeterias) };
}