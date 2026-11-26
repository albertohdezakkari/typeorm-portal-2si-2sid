#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"LABORATORIOS_${TALLER_EQUIPO}\" VALUE {'LABORATORIO_ID':1,'NOMBRE':'Laboratorio Azul'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"LABORATORIOS_${TALLER_EQUIPO}\" VALUE {'LABORATORIO_ID':2,'NOMBRE':'Laboratorio Verde'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"MUESTRAS_${TALLER_EQUIPO}\" VALUE {'MUESTRA_ID':7,'NOMBRE':'Muestra M-01','CANTIDAD_ML':75,'LABORATORIO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"MUESTRAS_${TALLER_EQUIPO}\" VALUE {'MUESTRA_ID':8,'NOMBRE':'Muestra M-02','CANTIDAD_ML':60,'LABORATORIO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"MUESTRAS_${TALLER_EQUIPO}\" VALUE {'MUESTRA_ID':9,'NOMBRE':'Muestra M-01 · nuevo','CANTIDAD_ML':90,'LABORATORIO_ID':1}"
