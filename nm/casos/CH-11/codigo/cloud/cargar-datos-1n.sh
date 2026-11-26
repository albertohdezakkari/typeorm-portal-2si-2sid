#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"HOTELES_${TALLER_EQUIPO}\" VALUE {'HOTEL_ID':1,'NOMBRE':'Hotel Aurora'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"HOTELES_${TALLER_EQUIPO}\" VALUE {'HOTEL_ID':2,'NOMBRE':'Hotel del Lago'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"RESERVAS_${TALLER_EQUIPO}\" VALUE {'RESERVA_ID':7,'NOMBRE':'Reserva R-101','NOCHES':7,'HOTEL_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"RESERVAS_${TALLER_EQUIPO}\" VALUE {'RESERVA_ID':8,'NOMBRE':'Reserva R-102','NOCHES':5,'HOTEL_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"RESERVAS_${TALLER_EQUIPO}\" VALUE {'RESERVA_ID':9,'NOMBRE':'Reserva R-101 · nuevo','NOCHES':9,'HOTEL_ID':1}"
