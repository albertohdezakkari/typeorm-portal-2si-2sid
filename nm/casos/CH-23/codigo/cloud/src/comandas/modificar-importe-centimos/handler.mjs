import { modificarImporteCentimosService } from './service.mjs';

export async function handler(event) {
  const comandaId = Number(event.pathParameters.comandaId);
  const { importeCentimos } = JSON.parse(event.body);
  const resultado = await modificarImporteCentimosService(comandaId, importeCentimos);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
