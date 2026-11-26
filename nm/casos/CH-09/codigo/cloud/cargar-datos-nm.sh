#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"MECANICOS_${TALLER_EQUIPO}\" VALUE {'MECANICO_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"MECANICOS_${TALLER_EQUIPO}\" VALUE {'MECANICO_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'REPARACION_ID':7,'MECANICO_ID':1,'ROL':'Diagnóstico'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'REPARACION_ID':7,'MECANICO_ID':2,'ROL':'Reparación'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'REPARACION_ID':8,'MECANICO_ID':1,'ROL':'Coordinación'}"
