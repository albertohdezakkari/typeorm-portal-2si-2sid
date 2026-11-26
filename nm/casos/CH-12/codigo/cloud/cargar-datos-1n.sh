#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"COOPERATIVAS_${TALLER_EQUIPO}\" VALUE {'COOPERATIVA_ID':1,'NOMBRE':'Cooperativa Olivo'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"COOPERATIVAS_${TALLER_EQUIPO}\" VALUE {'COOPERATIVA_ID':2,'NOMBRE':'Cooperativa Campo'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"LOTES_${TALLER_EQUIPO}\" VALUE {'LOTE_ID':7,'NOMBRE':'Lote de manzanas','KILOS':160,'COOPERATIVA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"LOTES_${TALLER_EQUIPO}\" VALUE {'LOTE_ID':8,'NOMBRE':'Lote de peras','KILOS':120,'COOPERATIVA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"LOTES_${TALLER_EQUIPO}\" VALUE {'LOTE_ID':9,'NOMBRE':'Lote de manzanas · nuevo','KILOS':200,'COOPERATIVA_ID':1}"
