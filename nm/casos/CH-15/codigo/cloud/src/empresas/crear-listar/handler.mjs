/* Terminal · API_URL es la URL real de tu API
curl -i -X POST "$API_URL/empresas" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Empresa Brújula"}'
curl -i "$API_URL/empresas"
*/
// POST /empresas con JSON: {"nombre":"Empresa Brújula"}
// GET /empresas lista los registros y sus IDs.
import { crearEmpresaService, listarEmpresasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre } = JSON.parse(event.body);
  const empresa = await crearEmpresaService(nombre);
  return { statusCode: 201, body: JSON.stringify(empresa) };
}

export async function listarHandler() {
  const empresas = await listarEmpresasService();
  return { statusCode: 200, body: JSON.stringify(empresas) };
}