#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"MONITORES_${TALLER_EQUIPO}\" VALUE {'MONITOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"MONITORES_${TALLER_EQUIPO}\" VALUE {'MONITOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ACTIVIDAD_ID':7,'MONITOR_ID':1,'ROL':'Dinamización'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ACTIVIDAD_ID':7,'MONITOR_ID':2,'ROL':'Apoyo'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ACTIVIDAD_ID':8,'MONITOR_ID':1,'ROL':'Coordinación'}"
