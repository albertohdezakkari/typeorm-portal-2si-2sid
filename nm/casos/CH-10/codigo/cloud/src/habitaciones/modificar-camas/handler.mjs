import { modificarCamasService } from './service.mjs';

export async function handler(event) {
  const habitacionId = Number(event.pathParameters.habitacionId);
  const { camas } = JSON.parse(event.body);
  const resultado = await modificarCamasService(habitacionId, camas);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
