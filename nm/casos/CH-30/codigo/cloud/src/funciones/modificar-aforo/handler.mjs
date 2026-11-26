import { modificarAforoService } from './service.mjs';

export async function handler(event) {
  const funcionId = Number(event.pathParameters.funcionId);
  const { aforo } = JSON.parse(event.body);
  const resultado = await modificarAforoService(funcionId, aforo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
