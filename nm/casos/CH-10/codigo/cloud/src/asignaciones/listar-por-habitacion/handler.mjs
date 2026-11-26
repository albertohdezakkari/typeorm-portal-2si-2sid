import { listarAsignacionesPorHabitacionService } from './service.mjs';

export async function handler(event) {
  const habitacionId = Number(event.pathParameters.habitacionId);
  const asignaciones = await listarAsignacionesPorHabitacionService(habitacionId);
  return { statusCode: 200, body: JSON.stringify(asignaciones) };
}
