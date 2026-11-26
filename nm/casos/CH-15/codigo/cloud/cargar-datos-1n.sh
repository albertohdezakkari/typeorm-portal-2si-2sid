#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"EMPRESAS_${TALLER_EQUIPO}\" VALUE {'EMPRESA_ID':1,'NOMBRE':'Empresa Brújula'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"EMPRESAS_${TALLER_EQUIPO}\" VALUE {'EMPRESA_ID':2,'NOMBRE':'Empresa Delta'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PROYECTOS_${TALLER_EQUIPO}\" VALUE {'PROYECTO_ID':7,'NOMBRE':'Portal de reservas','HORAS_ESTIMADAS':160,'EMPRESA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PROYECTOS_${TALLER_EQUIPO}\" VALUE {'PROYECTO_ID':8,'NOMBRE':'Catálogo interno','HORAS_ESTIMADAS':120,'EMPRESA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PROYECTOS_${TALLER_EQUIPO}\" VALUE {'PROYECTO_ID':9,'NOMBRE':'Portal de reservas · nuevo','HORAS_ESTIMADAS':200,'EMPRESA_ID':1}"
