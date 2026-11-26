#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"URBANIZACIONES_${TALLER_EQUIPO}\" VALUE {'URBANIZACION_ID':1,'NOMBRE':'Urbanización Jardín'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"URBANIZACIONES_${TALLER_EQUIPO}\" VALUE {'URBANIZACION_ID':2,'NOMBRE':'Urbanización Lago'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PLAZAS_${TALLER_EQUIPO}\" VALUE {'PLAZA_ID':7,'NOMBRE':'Plaza P-01','SUPERFICIE_M2':28,'URBANIZACION_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PLAZAS_${TALLER_EQUIPO}\" VALUE {'PLAZA_ID':8,'NOMBRE':'Plaza P-02','SUPERFICIE_M2':18,'URBANIZACION_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PLAZAS_${TALLER_EQUIPO}\" VALUE {'PLAZA_ID':9,'NOMBRE':'Plaza P-01 · nuevo','SUPERFICIE_M2':38,'URBANIZACION_ID':1}"
