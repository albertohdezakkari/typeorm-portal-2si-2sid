#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"HOSPITALES_${TALLER_EQUIPO}\" VALUE {'HOSPITAL_ID':1,'NOMBRE':'Hospital Central'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"HOSPITALES_${TALLER_EQUIPO}\" VALUE {'HOSPITAL_ID':2,'NOMBRE':'Hospital del Valle'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"HABITACIONES_${TALLER_EQUIPO}\" VALUE {'HABITACION_ID':7,'NOMBRE':'Habitación A','CAMAS':4,'HOSPITAL_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"HABITACIONES_${TALLER_EQUIPO}\" VALUE {'HABITACION_ID':8,'NOMBRE':'Habitación B','CAMAS':3,'HOSPITAL_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"HABITACIONES_${TALLER_EQUIPO}\" VALUE {'HABITACION_ID':9,'NOMBRE':'Habitación A · nuevo','CAMAS':5,'HOSPITAL_ID':1}"
