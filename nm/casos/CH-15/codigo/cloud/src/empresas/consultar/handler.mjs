import { consultarEmpresaService } from './service.mjs';

export async function handler(event) {
  const empresaId = Number(event.pathParameters.empresaId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarEmpresaService(empresaId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
