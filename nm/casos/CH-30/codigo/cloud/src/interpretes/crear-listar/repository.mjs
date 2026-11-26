import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_INTERPRETE } from '../../models/interprete-asignacion.model.mjs';

export async function crearInterpreteRepository(interprete) {
  await MODELO_INTERPRETE.build(EntityRepository).put(
    interprete,
    { condition: { attr: 'interpreteId', exists: false } }
  );
}

export async function listarInterpretesRepository() {
  const { Items = [] } = await MODELO_INTERPRETE.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
