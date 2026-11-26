#!/usr/bin/env bash
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ACTORES_${TALLER_EQUIPO}\" VALUE {'ACTOR_ID':1,'NOMBRE':'Diego','APELLIDOS':'Ruiz López','EMAIL':'diego.ruiz@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ACTORES_${TALLER_EQUIPO}\" VALUE {'ACTOR_ID':2,'NOMBRE':'Ana','APELLIDOS':'Vidal Sanz','EMAIL':'ana.vidal@example.test'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ESCENA_ID':7,'ACTOR_ID':1,'ROL':'Protagonista'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ESCENA_ID':7,'ACTOR_ID':2,'ROL':'Reparto'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ASIGNACIONES_${TALLER_EQUIPO}\" VALUE {'ESCENA_ID':8,'ACTOR_ID':1,'ROL':'Coordinación'}"
