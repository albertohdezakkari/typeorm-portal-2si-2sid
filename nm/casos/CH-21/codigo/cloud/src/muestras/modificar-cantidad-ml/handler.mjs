import { modificarCantidadMlService } from './service.mjs';

export async function handler(event) {
  const muestraId = Number(event.pathParameters.muestraId);
  const { cantidadMl } = JSON.parse(event.body);
  const resultado = await modificarCantidadMlService(muestraId, cantidadMl);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
