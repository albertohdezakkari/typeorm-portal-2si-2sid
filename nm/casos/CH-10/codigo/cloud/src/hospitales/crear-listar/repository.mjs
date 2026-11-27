import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_HOSPITAL } from '../../models/hospital-habitacion.model.mjs';

export async function crearHospitalRepository(hospital) {
  await MODELO_HOSPITAL.build(EntityRepository).put(
    hospital,
    { condition: { attr: 'hospitalId', exists: false } }
  );
}

export async function listarHospitalesRepository() {
  const { Items = [] } = await MODELO_HOSPITAL.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}