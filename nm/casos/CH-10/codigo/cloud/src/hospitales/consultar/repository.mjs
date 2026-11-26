import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_HABITACION, MODELO_HOSPITAL } from '../../models/hospital-habitacion.model.mjs';

export async function buscarHospitalRepository(hospitalId) {
  const { Item } = await MODELO_HOSPITAL.build(EntityRepository).get(
    { hospitalId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarHospitalRepository(hospitalId, minimo) {
  const { Items = [] } = await MODELO_HABITACION.build(EntityRepository).query(
    { index: 'PorHospital', partition: hospitalId },
    { filters: { Habitacion: { attr: 'camas', gte: minimo } } }
  );
  return Items;
}
