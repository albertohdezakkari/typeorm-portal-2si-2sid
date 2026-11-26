import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_PLAZA, MODELO_URBANIZACION } from '../../models/urbanizacion-plaza.model.mjs';

export async function crearPlazaRepository(plaza) {
  await MODELO_PLAZA.build(EntityRepository).put(
    plaza,
    { condition: { attr: 'plazaId', exists: false } }
  );
}

export async function listarPlazasRepository() {
  const { Items = [] } = await MODELO_PLAZA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
