/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/hospitales" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Hospital Central"}'
curl -i "$API_URL/hospitales"
*/
// POST /hospitales con JSON: {"nombre":"Hospital Central"}
// GET /hospitales lista los registros y sus IDs.
import { crearHospitalService, listarHospitalesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const hospital = await crearHospitalService(nombre);
  return { statusCode: 201, body: JSON.stringify(hospital) };
}

export async function listarHandler() {
  const hospitales = await listarHospitalesService();
  return { statusCode: 200, body: JSON.stringify(hospitales) };
}