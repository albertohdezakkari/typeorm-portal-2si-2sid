#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"TRIPULANTES_${TALLER_EQUIPO}\" VALUE {'TRIPULANTE_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"TRIPULANTES_${TALLER_EQUIPO}\" VALUE {'TRIPULANTE_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'EMBARCACION_ID':7,'TRIPULANTE_ID':1,'ROL':'Navegación'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'EMBARCACION_ID':7,'TRIPULANTE_ID':2,'ROL':'Mantenimiento'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'EMBARCACION_ID':8,'TRIPULANTE_ID':1,'ROL':'Coordinación'}"
