import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_COMANDA, MODELO_CAFETERIA } from '../../models/cafeteria-comanda.model.mjs';

export async function modificarImporteCentimosRepository(comandaId, importeCentimos) {
  const { Attributes } = await MODELO_COMANDA.build(EntityRepository).update(
    { comandaId, importeCentimos },
    {
      condition: { attr: 'comandaId', exists: true },
      returnValues: 'ALL_NEW'
    }
  );
  return Attributes;
}
