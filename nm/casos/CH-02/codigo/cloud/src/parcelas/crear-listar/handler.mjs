import { crearParcelaService, listarParcelasService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, superficieM2, huertoId } = JSON.parse(event.body);
  const parcela = await crearParcelaService(nombre, superficieM2, huertoId);
  return { statusCode: 201, body: JSON.stringify(parcela) };
}

export async function listarHandler() {
  const parcelas = await listarParcelasService();
  return { statusCode: 200, body: JSON.stringify(parcelas) };
}
