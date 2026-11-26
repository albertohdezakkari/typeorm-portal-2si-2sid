import { eliminarAsignacionService } from './service.mjs';

export async function handler(event) {
  const plazaId = Number(event.pathParameters.plazaId);
  const tecnicoId = Number(event.pathParameters.tecnicoId);
  await eliminarAsignacionService(plazaId, tecnicoId);
  return { statusCode: 204, body: '' };
}
