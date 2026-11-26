#!/usr/bin/env bash
# Solo para una tabla nueva de referencia. En tu proyecto existente conserva sus datos.
set -e
aws dynamodb execute-statement \
  --statement "INSERT INTO \"FESTIVALES_${TALLER_EQUIPO}\" VALUE {'FESTIVAL_ID':1,'NOMBRE':'Festival del Sol'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"FESTIVALES_${TALLER_EQUIPO}\" VALUE {'FESTIVAL_ID':2,'NOMBRE':'Festival del Río'}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ACTUACIONES_${TALLER_EQUIPO}\" VALUE {'ACTUACION_ID':7,'NOMBRE':'Concierto acústico','DURACION_MINUTOS':85,'FESTIVAL_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ACTUACIONES_${TALLER_EQUIPO}\" VALUE {'ACTUACION_ID':8,'NOMBRE':'Danza urbana','DURACION_MINUTOS':60,'FESTIVAL_ID':2}"
aws dynamodb execute-statement \
  --statement "INSERT INTO \"ACTUACIONES_${TALLER_EQUIPO}\" VALUE {'ACTUACION_ID':9,'NOMBRE':'Concierto acústico · nuevo','DURACION_MINUTOS':110,'FESTIVAL_ID':1}"
