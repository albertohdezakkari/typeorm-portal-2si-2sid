import { trasladarMuestraRepository } from './repository.mjs';
import { buscarLaboratorioRepository } from '../../laboratorios/consultar/repository.mjs';

export async function trasladarMuestraService(muestraId, laboratorioId) {
  const laboratorio = await buscarLaboratorioRepository(laboratorioId);
  if (!laboratorio) throw new Error('Laboratorio no encontrado');
  return trasladarMuestraRepository(muestraId, laboratorioId);
}
