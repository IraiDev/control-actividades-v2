import React, { useContext } from 'react'
import { ActivityContext } from '../../context/ActivityContext';
import Card from '../card/Card'
import PResp from '../ui/text/PResp';

function ActivitiesScreen() {
  const { states: ActFunc } = useContext(ActivityContext)
  return (
    <div className="container mx-auto my-5">
      <div className="grid gap-5 lg:grid-cols-2">
        {ActFunc.activitiesRA.length > 0 ? (
          ActFunc.activitiesRA.map((obj) => {
            let subproyecto = obj.subproyectos_tareas !== null ?
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
                subProyecto={subproyecto}
                bgColor={obj.color_prioridad}
                notas={obj.notas}
                pausa={obj.pausas}
                prioridad={obj.prioridad_etiqueta}
                prioridadRA={obj.num_prioridad}
              />
            );
          })
        ) : (<PResp />)}
      </div>
    </div>
  )
}

export default ActivitiesScreen
