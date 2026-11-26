import { trasladarProyectoRepository } from './repository.mjs';
import { buscarEmpresaRepository } from '../../empresas/consultar/repository.mjs';

export async function trasladarProyectoService(proyectoId, empresaId) {
  const empresa = await buscarEmpresaRepository(empresaId);
  if (!empresa) throw new Error('Empresa no encontrado');
  return trasladarProyectoRepository(proyectoId, empresaId);
}
