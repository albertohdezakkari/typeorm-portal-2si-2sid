import { trasladarHabitacionRepository } from './repository.mjs';
import { buscarHospitalRepository } from '../../hospitales/consultar/repository.mjs';

export async function trasladarHabitacionService(habitacionId, hospitalId) {
  const hospital = await buscarHospitalRepository(hospitalId);
  if (!hospital) throw new Error('Hospital no encontrado');
  return trasladarHabitacionRepository(habitacionId, hospitalId);
}
