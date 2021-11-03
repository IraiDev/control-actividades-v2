import React, { useContext, useState } from 'react'
import { UiContext } from '../../context/UiContext'
import { ActivityContext } from '../../context/ActivityContext'
import ActivityDetailScreen from './ActivityDetailScreen'
import ModernCard from '../card/ModernCard'
import Button from '../ui/buttons/Button'
import TextContent from '../ui/text/TextContent'

function ActivitiesScreen() {
  const { states: ActState } = useContext(ActivityContext)
  const { states: UiState, functions: UiFunc } = useContext(UiContext)
  const [cardView, setCardView] = useState(false)
  const [isExpand, setIsExpand] = useState(false)

  const handleList = () => {
    UiFunc.setIsLoading(true)
    setTimeout(() => {
      setCardView(true)
      UiFunc.setIsLoading(false)
    }, 1000)
  }

  const handleGrid = () => {
    UiFunc.setIsLoading(true)
    setTimeout(() => {
      setCardView(false)
      UiFunc.setIsLoading(false)
    }, 500)
  }
  const handleExpand = () => {
    setIsExpand(!isExpand)
  }

  return (
    <>

      {UiState.allOrDetails ?
        <div className={`my-3 ${cardView ? 'px-5' : 'container mx-auto'}`}>
          <div className="flex justify-between items-center border-b-2 border-gray-300 mb-5 container mx-auto">
            <p className="ml-1 font-semibold text-gray-500">{ActState.activitiesRA.length} {ActState.activitiesRA.length <= 1 ? 'Actividad' : 'Actividades'}</p>
            <div>
              <Button
                className={`bg-transparent text-gray-800 rounded-md hover:bg-gray-300 px-2 py-1 mb-1 ${!cardView && 'text-blue-600'}`}
                type="icon"
                icon="fas fa-border-all"
                tippyText="Modo tarjeta"
                onClick={handleGrid}
              />
              <Button
                className={`bg-transparent text-gray-800 rounded-md hover:bg-gray-300 px-2 py-1 mb-1 ${cardView && 'text-blue-600'}`}
                type="icon"
                icon="fas fa-th-list"
                tippyText="Modo lista"
                onClick={handleList}
              />
            </div>
          </div>
          {
            cardView ?
              <div className="overflow-x-auto overflow-y-hidden text-center text-sm h-table scroll-row">
                <div className="grid grid-cols-12 shadow-md rounded-md font-semibold text-white min-w-fake-table sticky top-0">
                  <div className="bg-gray-500 hover:bg-gray-700 rounded-l-md px-2 py-4 transition duration-500 col-span-1">ID</div>
                  <div className="bg-gray-600 hover:bg-gray-800 px-2 py-4 transition duration-500 col-span-1">Ticket</div>
                  <div className="bg-gray-500 hover:bg-gray-700 px-2 py-4 transition duration-500 col-span-1">Proyecto</div>
                  <div className="bg-gray-600 hover:bg-gray-800 px-2 py-4 transition duration-500 col-span-1">SubProy.</div>
                  <div className="bg-gray-500 hover:bg-gray-700 px-2 py-2 transition duration-500 col-span-1">
                    Solicitante
                    <span className="block text-xs font-normal">(Fecha)</span>
                  </div>
                  <div className="bg-gray-600 hover:bg-gray-800 px-2 py-4 transition duration-500 col-span-1">Encargado</div>
                  <div className="bg-gray-500 hover:bg-gray-700 px-2 py-4 transition duration-500 col-span-1">Actividad</div>
                  <div className="bg-gray-600 hover:bg-gray-800 px-2 py-4 transition duration-500 col-span-3">
                    Descripcion
                    <Button
                      className="ml-2"
                      type="icon"
                      icon={isExpand ? 'fas fa-angle-up' : 'fas fa-angle-down'}
                      tippyText={isExpand ? 'Ocultar' : 'Mostrar'}
                      onClick={handleExpand} />
                  </div>
                  <div className="bg-gray-500 hover:bg-gray-700 px-2 py-4 transition duration-500 col-span-1">Estado</div>
                  <div className="bg-gray-600 hover:bg-gray-800 rounded-r-md px-2 py-4 transition duration-500 col-span-1">Acciones</div>
                </div>
                {ActState.activitiesRA.length > 0 ?
                  ActState.activitiesRA.map((obj, index) => {
                    let subProyecto = obj.subproyectos_tareas !== null ?
                      obj.subproyectos_tareas.nombre_sub_proy : ""
                    return (
                      <ModernCard
                        expand={isExpand}
                        type="list"
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
                  }) : <TextContent className="text-center" type="response" value="No hay actividades" />
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
                  }) : <TextContent className="text-center xl:col-span-4 lg:col-span-3 md:col-span-2 col-span-1" type="response" value="No hay actividades" />
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
