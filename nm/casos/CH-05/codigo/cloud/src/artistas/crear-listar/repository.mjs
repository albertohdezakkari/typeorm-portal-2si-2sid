import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';
import { MODELO_ARTISTA } from '../../models/artista-asignacion.model.mjs';

export async function crearArtistaRepository(artista) {
  await MODELO_ARTISTA.build(EntityRepository).put(
    artista,
    { condition: { attr: 'artistaId', exists: false } }
  );
}

export async function listarArtistasRepository() {
  const { Items = [] } = await MODELO_ARTISTA.build(EntityRepository).scan(
    { consistent: true }
  );
  return Items;
}
