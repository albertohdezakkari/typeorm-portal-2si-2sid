/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/laboratorios" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Laboratorio Azul"}'
curl -i "$API_URL/laboratorios"
*/
// POST /laboratorios con JSON: {"nombre":"Laboratorio Azul"}
// GET /laboratorios lista los registros y sus IDs.
import { crearLaboratorioService, listarLaboratoriosService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const laboratorio = await crearLaboratorioService(nombre);
  return { statusCode: 201, body: JSON.stringify(laboratorio) };
}

export async function listarHandler() {
  const laboratorios = await listarLaboratoriosService();
  return { statusCode: 200, body: JSON.stringify(laboratorios) };
}