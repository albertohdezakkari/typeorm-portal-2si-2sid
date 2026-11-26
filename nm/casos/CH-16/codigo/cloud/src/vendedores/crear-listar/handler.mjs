import { crearVendedorService, listarVendedoresService } from './service.mjs';

export async function crearHandler(event) {
  const { nombre, apellidos, email } = JSON.parse(event.body);
  const vendedor = await crearVendedorService(nombre, apellidos, email);
  return { statusCode: 201, body: JSON.stringify(vendedor) };
}

export async function listarHandler() {
  const vendedores = await listarVendedoresService();
  return { statusCode: 200, body: JSON.stringify(vendedores) };
}
