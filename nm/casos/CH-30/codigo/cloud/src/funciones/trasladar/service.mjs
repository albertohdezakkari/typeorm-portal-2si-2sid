import { trasladarFuncionRepository } from './repository.mjs';
import { buscarTeatroRepository } from '../../teatros/consultar/repository.mjs';

export async function trasladarFuncionService(funcionId, teatroId) {
  const teatro = await buscarTeatroRepository(teatroId);
  if (!teatro) throw new Error('Teatro no encontrado');
  return trasladarFuncionRepository(funcionId, teatroId);
}
