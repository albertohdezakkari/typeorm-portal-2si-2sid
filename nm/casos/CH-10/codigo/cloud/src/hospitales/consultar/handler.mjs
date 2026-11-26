import { consultarHospitalService } from './service.mjs';

export async function handler(event) {
  const hospitalId = Number(event.pathParameters.hospitalId);
  const minimo = Number(event.queryStringParameters?.minimo ?? 0);
  const resultado = await consultarHospitalService(hospitalId, minimo);
  return { statusCode: 200, body: JSON.stringify(resultado) };
}
