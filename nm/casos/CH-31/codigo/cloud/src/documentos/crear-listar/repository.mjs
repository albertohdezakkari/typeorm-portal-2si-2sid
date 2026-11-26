import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_DOCUMENTO, MODELO_ARCHIVO } from '../../models/archivo-documento.model.mjs';

export async function crearDocumentoRepository(documento) {
  await MODELO_DOCUMENTO.build(EntityRepository).put(
    documento,
    { condition: { attr: 'documentoId', exists: false } }
  );
}

export async function listarDocumentosRepository() {
  const { Items = [] } = await MODELO_DOCUMENTO.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
