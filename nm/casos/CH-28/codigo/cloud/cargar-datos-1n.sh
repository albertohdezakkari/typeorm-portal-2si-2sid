#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"VIVEROS_${TALLER_EQUIPO}\" VALUE {'VIVERO_ID':1,'NOMBRE':'Vivero Raíz'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"VIVEROS_${TALLER_EQUIPO}\" VALUE {'VIVERO_ID':2,'NOMBRE':'Vivero Hoja'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PLANTAS_${TALLER_EQUIPO}\" VALUE {'PLANTA_ID':7,'NOMBRE':'Lavanda','ALTURA_CM':95,'VIVERO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PLANTAS_${TALLER_EQUIPO}\" VALUE {'PLANTA_ID':8,'NOMBRE':'Romero','ALTURA_CM':70,'VIVERO_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PLANTAS_${TALLER_EQUIPO}\" VALUE {'PLANTA_ID':9,'NOMBRE':'Lavanda · nuevo','ALTURA_CM':120,'VIVERO_ID':1}"
