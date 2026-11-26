#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"GRANJAS_${TALLER_EQUIPO}\" VALUE {'GRANJA_ID':1,'NOMBRE':'Granja del Sol'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"GRANJAS_${TALLER_EQUIPO}\" VALUE {'GRANJA_ID':2,'NOMBRE':'Granja del Monte'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"COSECHAS_${TALLER_EQUIPO}\" VALUE {'COSECHA_ID':7,'NOMBRE':'Cosecha de tomate','KILOS':300,'GRANJA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"COSECHAS_${TALLER_EQUIPO}\" VALUE {'COSECHA_ID':8,'NOMBRE':'Cosecha de calabaza','KILOS':220,'GRANJA_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"COSECHAS_${TALLER_EQUIPO}\" VALUE {'COSECHA_ID':9,'NOMBRE':'Cosecha de tomate · nuevo','KILOS':380,'GRANJA_ID':1}"
