#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PROFESIONALES_${TALLER_EQUIPO}\" VALUE {'PROFESIONAL_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"PROFESIONALES_${TALLER_EQUIPO}\" VALUE {'PROFESIONAL_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'OBRA_ID':7,'PROFESIONAL_ID':1,'ROL':'Electricista'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'OBRA_ID':7,'PROFESIONAL_ID':2,'ROL':'Arquitecta'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'OBRA_ID':8,'PROFESIONAL_ID':1,'ROL':'Coordinador'}"
