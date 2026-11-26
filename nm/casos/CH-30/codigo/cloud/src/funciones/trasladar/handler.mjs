import { trasladarFuncionService } from './service.mjs';

export async function handler(event) {
  const funcionId = Number(event.pathParameters.funcionId);
  const { teatroId } = JSON.parse(event.body);
  const resultado = await trasladarFuncionService(funcionId, teatroId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
