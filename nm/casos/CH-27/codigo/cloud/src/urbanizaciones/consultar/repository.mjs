import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PLAZA, MODELO_URBANIZACION } from '../../models/urbanizacion-plaza.model.mjs';

export async function buscarUrbanizacionRepository(urbanizacionId) {
  const { Item } = await MODELO_URBANIZACION.build(EntityRepository).get(
    { urbanizacionId },
    { consistent: true }
  );
  return Item ?? null;
}

export async function consultarUrbanizacionRepository(urbanizacionId, minimo) {
  const { Items = [] } = await MODELO_PLAZA.build(EntityRepository).query(
    { index: 'PorUrbanizacion', partition: urbanizacionId },
    { filters: { Plaza: { attr: 'superficieM2', gte: minimo } } }
  );
  return Items;
}
