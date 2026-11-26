import { buscarClubRepository, consultarClubRepository } from './repository.mjs';

export async function consultarClubService(clubId, minimo) {
  const club = await buscarClubRepository(clubId);
  if (!club) throw new Error('Club no encontrado');
  const actividades = await consultarClubRepository(clubId, minimo);
  return { club, actividades };
}
