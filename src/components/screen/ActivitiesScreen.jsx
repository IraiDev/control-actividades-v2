import React, { useContext, useEffect, useState } from 'react'
import { UiContext } from '../../context/UiContext';
import { ActivityContext } from '../../context/ActivityContext';
import Card from '../card/Card'
import PResp from '../ui/text/PResp';
import ActivityDetailScreen from './ActivityDetailScreen';
import ModernCard from '../card/ModernCard';

function ActivitiesScreen() {
  const { states: ActState } = useContext(ActivityContext)
  const { states: UiState } = useContext(UiContext)

  useEffect(() => {

  }, [])

  return (
    <>

      {UiState.allOrDetails ?
        <div className="container mx-auto my-5">
          {
            UiState.cardView ?
              <div className="grid gap-5 xl:grid-cols-2 lg:grid-cols-1">
                {ActState.activitiesRA.length > 0 ?
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
                  }) : <PResp />
                }
              </div>
              :
              <div className="grid gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                {ActState.activitiesRA.length > 0 ?
                  ActState.activitiesRA.map((obj, index) => {
                    let subProyecto = obj.subproyectos_tareas !== null ?
                      obj.subproyectos_tareas.nombre_sub_proy : ""
                    return (
                      <ModernCard
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
                    )
                  }) : <PResp />
                }
              </div>
          }
        </div>
        :
        <ActivityDetailScreen />
      }


    </>
  )
}

export default ActivitiesScreen
