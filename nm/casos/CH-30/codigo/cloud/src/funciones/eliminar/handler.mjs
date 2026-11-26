import { eliminarFuncionService } from './service.mjs';

export async function handler(event) {
  const funcionId = Number(event.pathParameters.funcionId);
  await eliminarFuncionService(funcionId);
  return { statusCode: 204 };
}
