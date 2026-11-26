import { buscarHospitalRepository, consultarHospitalRepository } from './repository.mjs';

export async function consultarHospitalService(hospitalId, minimo) {
  const hospital = await buscarHospitalRepository(hospitalId);
  if (!hospital) throw new Error('Hospital no encontrado');
  const habitaciones = await consultarHospitalRepository(hospitalId, minimo);
  return { hospital, habitaciones };
}
