#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ENFERMEROS_${TALLER_EQUIPO}\" VALUE {'ENFERMERO_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ENFERMEROS_${TALLER_EQUIPO}\" VALUE {'ENFERMERO_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'HABITACION_ID':7,'ENFERMERO_ID':1,'ROL':'Cuidados'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'HABITACION_ID':7,'ENFERMERO_ID':2,'ROL':'Supervisión'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'HABITACION_ID':8,'ENFERMERO_ID':1,'ROL':'Coordinación'}"
