#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"CONDUCTORES_${TALLER_EQUIPO}\" VALUE {'CONDUCTOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"CONDUCTORES_${TALLER_EQUIPO}\" VALUE {'CONDUCTOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'TRAYECTO_ID':7,'CONDUCTOR_ID':1,'ROL':'Conducción'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'TRAYECTO_ID':7,'CONDUCTOR_ID':2,'ROL':'Relevo'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'TRAYECTO_ID':8,'CONDUCTOR_ID':1,'ROL':'Coordinación'}"
