import { trasladarReparacionRepository } from './repository.mjs';
import { buscarTallerRepository } from '../../talleres/consultar/repository.mjs';

export async function trasladarReparacionService(reparacionId, tallerId) {
  const taller = await buscarTallerRepository(tallerId);
  if (!taller) throw new Error('Taller no encontrado');
  return trasladarReparacionRepository(reparacionId, tallerId);
}
