import { modificarDuracionMinutosService } from './service.mjs';

export async function handler(event) {
  const programaId = Number(event.pathParameters.programaId);
  const { duracionMinutos } = JSON.parse(event.body);
  const resultado = await modificarDuracionMinutosService(programaId, duracionMinutos);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
