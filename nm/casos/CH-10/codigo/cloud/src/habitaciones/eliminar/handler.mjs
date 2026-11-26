import { eliminarHabitacionService } from './service.mjs';

export async function handler(event) {
  const habitacionId = Number(event.pathParameters.habitacionId);
  await eliminarHabitacionService(habitacionId);
  return { statusCode: 204 };
}
