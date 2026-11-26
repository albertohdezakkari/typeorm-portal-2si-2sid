import { eliminarProgramaService } from './service.mjs';

export async function handler(event) {
  const programaId = Number(event.pathParameters.programaId);
  await eliminarProgramaService(programaId);
  return { statusCode: 204 };
}
