import { modificarPresupuestoEurosService } from './service.mjs';

export async function handler(event) {
  const obraId = Number(event.pathParameters.obraId);
  const { presupuestoEuros } = JSON.parse(event.body);
  const resultado = await modificarPresupuestoEurosService(obraId, presupuestoEuros);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
