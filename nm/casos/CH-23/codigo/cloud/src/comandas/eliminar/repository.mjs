import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_COMANDA, MODELO_CAFETERIA } from '../../models/cafeteria-comanda.model.mjs';

export async function eliminarComandaRepository(comandaId) {
  await MODELO_COMANDA.build(EntityRepository).delete(
    { comandaId }
  );
}
