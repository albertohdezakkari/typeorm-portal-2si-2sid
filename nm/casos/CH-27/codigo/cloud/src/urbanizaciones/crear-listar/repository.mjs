import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_URBANIZACION } from '../../models/urbanizacion-plaza.model.mjs';

export async function crearUrbanizacionRepository(urbanizacion) {
  await MODELO_URBANIZACION.build(EntityRepository).put(
    urbanizacion,
    { condition: { attr: 'urbanizacionId', exists: false } }
  );
}

export async function listarUrbanizacionesRepository() {
  const { Items = [] } = await MODELO_URBANIZACION.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}