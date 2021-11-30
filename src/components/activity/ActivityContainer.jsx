import React, { useEffect } from 'react'
import TextContent from '../ui/text/TextContent'
import Activity from './Activity'

function ActivityContainer({ array = [], type, onExpand }) {

  useEffect(() => {
    // console.log(array)
  }, [])

  return (
    <>
      {
        array.length > 0 ?
          array.map((obj, index) => {
            let subProyecto = obj.subproyectos_tareas !== null ?
              obj.subproyectos_tareas.nombre_sub_proy : ""
            return (
              <Activity
                expand={onExpand}
                type={type}
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
          : <TextContent
            className={type === 'list' ? 'text-center' : 'text-center xl:col-span-4 lg:col-span-3 md:col-span-2 col-span-1'}
            type="response"
            value="No hay actividades" />
      }
    </>
  )
}

export default ActivityContainer
