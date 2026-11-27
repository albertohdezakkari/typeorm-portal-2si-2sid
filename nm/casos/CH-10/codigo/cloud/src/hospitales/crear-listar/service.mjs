import { crearHospitalRepository, listarHospitalesRepository } from './repository.mjs';

export async function crearHospitalService(nombre) {
  const hospitalId = Date.now();
  const hospital = { hospitalId, nombre };
  await crearHospitalRepository(hospital);
  return hospital;
}

export function listarHospitalesService() {
  return listarHospitalesRepository();
}