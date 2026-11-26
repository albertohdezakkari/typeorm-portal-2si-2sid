import { trasladarActividadRepository } from './repository.mjs';
import { buscarClubRepository } from '../../clubes/consultar/repository.mjs';

export async function trasladarActividadService(actividadId, clubId) {
  const club = await buscarClubRepository(clubId);
  if (!club) throw new Error('Club no encontrado');
  return trasladarActividadRepository(actividadId, clubId);
}
