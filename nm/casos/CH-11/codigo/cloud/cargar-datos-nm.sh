#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"HUESPEDES_${TALLER_EQUIPO}\" VALUE {'HUESPED_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"HUESPEDES_${TALLER_EQUIPO}\" VALUE {'HUESPED_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'RESERVA_ID':7,'HUESPED_ID':1,'ROL':'Titular'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'RESERVA_ID':7,'HUESPED_ID':2,'ROL':'Acompañante'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'RESERVA_ID':8,'HUESPED_ID':1,'ROL':'Responsable del grupo'}"
