import React, { useContext, useEffect } from 'react'
import { ActivityContext } from '../../context/ActivityContext';
import Card from '../card/Card'
import PResp from '../ui/text/PResp';

function ActivitiesScreen() {
  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)

  useEffect(() => {
    ActFunc.getActivities()
  }, [])

  return (
    <div className="container mx-auto my-5">
      <div className="grid gap-5 xl:grid-cols-2 lg:grid-cols-1">
        {ActState.activitiesRA.length > 0 ? (
          ActState.activitiesRA.map((obj, index) => {
            let subProyecto = obj.subproyectos_tareas !== null ?
              obj.subproyectos_tareas.nombre_sub_proy : ""
            return (
              <Card
                key={obj.id_det}
                actividad={obj.actividad}
                encargado={obj.encargado_actividad}
                estado={obj.estado}
                desc={obj.func_objeto}
                id={obj.id_det}
                solicitante={obj.user_solicita}
                ticket={obj.num_ticket_edit}
                proyecto={obj.proyecto_tarea.abrev}
                subProyecto={subProyecto}
                bgColor={obj.color_prioridad}
                notas={obj.notas}
                pausas={obj.pausas}
                prioridad={obj.prioridad_etiqueta}
                prioridadRA={obj.num_prioridad}
                fechaCrea={obj.fecha_tx}
                numberCard={index + 1}
              />
            );
          })
        ) : (<PResp />)}
      </div>
    </div>
  )
}

export default ActivitiesScreen
