import { crearHabitacionService, listarHabitacionesService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, camas, hospitalId } = JSON.parse(event.body);
  const habitacion = await crearHabitacionService(nombre, camas, hospitalId);
  return { statusCode: 201, body: JSON.stringify(habitacion) };
}

export async function listarHandler() {
  const habitaciones = await listarHabitacionesService();
  return { statusCode: 200, body: JSON.stringify(habitaciones) };
}
