import { trasladarHabitacionService } from './service.mjs';

export async function handler(event) {
  const habitacionId = Number(event.pathParameters.habitacionId);
  const { hospitalId } = JSON.parse(event.body);
  const resultado = await trasladarHabitacionService(habitacionId, hospitalId);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
