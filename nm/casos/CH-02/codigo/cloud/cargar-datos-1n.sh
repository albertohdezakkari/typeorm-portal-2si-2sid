#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"HUERTOS_${TALLER_EQUIPO}\" VALUE {'HUERTO_ID':1,'NOMBRE':'Huerto del Río'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"HUERTOS_${TALLER_EQUIPO}\" VALUE {'HUERTO_ID':2,'NOMBRE':'Huerto del Parque'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PARCELAS_${TALLER_EQUIPO}\" VALUE {'PARCELA_ID':7,'NOMBRE':'Parcela A','SUPERFICIE_M2':65,'HUERTO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PARCELAS_${TALLER_EQUIPO}\" VALUE {'PARCELA_ID':8,'NOMBRE':'Parcela B','SUPERFICIE_M2':45,'HUERTO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PARCELAS_${TALLER_EQUIPO}\" VALUE {'PARCELA_ID':9,'NOMBRE':'Parcela C','SUPERFICIE_M2':80,'HUERTO_ID':1}"
