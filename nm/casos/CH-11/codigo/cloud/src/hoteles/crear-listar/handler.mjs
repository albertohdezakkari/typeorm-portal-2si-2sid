/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/hoteles" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Hotel Aurora"}'
curl -i "$API_URL/hoteles"
*/
// POST /hoteles con JSON: {"nombre":"Hotel Aurora"}
// GET /hoteles lista los registros y sus IDs.
import { crearHotelService, listarHotelesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const hotel = await crearHotelService(nombre);
  return { statusCode: 201, body: JSON.stringify(hotel) };
}

export async function listarHandler() {
  const hoteles = await listarHotelesService();
  return { statusCode: 200, body: JSON.stringify(hoteles) };
}