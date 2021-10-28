import React, { useContext, useState } from 'react'
import { UiContext } from '../../context/UiContext';
import { ActivityContext } from '../../context/ActivityContext';
import Card from '../card/Card'
import PResp from '../ui/text/PResp';
import ActivityDetailScreen from './ActivityDetailScreen';
import ModernCard from '../card/ModernCard';
import Button from '../ui/buttons/Button';

function ActivitiesScreen() {
  const { states: ActState } = useContext(ActivityContext)
  const { states: UiState, functions: UiFunc } = useContext(UiContext)
  const [cardView, setCardView] = useState(false)

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

  return (
    <>

      {UiState.allOrDetails ?
        <div className={`my-3 ${cardView ? 'px-5' : 'container mx-auto'}`}>
          <div className="flex justify-between items-center border-b-2 border-gray-300 mb-5">
            <p className="ml-1 font-semibold text-gray-500">{ActState.activitiesRA.length} {ActState.activitiesRA.length <= 1 ? 'Actividad' : 'Actividades'}</p>
            <div>
              <Button
                type="icon"
                shadow={false}
                className={`bg-transparent text-gray-800 rounded-md hover:bg-gray-300 px-2 py-1 mb-1 ${!cardView && 'text-blue-600'}`}
                icon="fas fa-border-all"
                onClick={handleGrid}
              />
              <Button
                type="icon"
                shadow={false}
                className={`bg-transparent text-gray-800 rounded-md hover:bg-gray-300 px-2 py-1 mb-1 ${cardView && 'text-blue-600'}`}
                icon="fas fa-th-list"
                onClick={handleList}
              />
            </div>
          </div>
          {
            cardView ?
              <div className="overflow-x-auto overflow-y-hidden">
                <div className="table w-full capitalize text-sm">
                  <div className="table-header-group shadow-md bg-gray-500 font-semibold text-white">
                    <div className="table-cell p-2">ID</div>
                    <div className="table-cell p-2">Ticket</div>
                    <div className="table-cell p-2">Proyecto</div>
                    <div className="table-cell p-2">SubProy.</div>
                    <div className="table-cell p-2">Solicitante</div>
                    <div className="table-cell p-2">Encargado</div>
                    <div className="table-cell p-2">Actividad</div>
                    <div className="table-cell p-2 text-center">Descripcion</div>
                    <div className="table-cell p-2">Archivos</div>
                    <div className="table-cell p-2">Estado</div>
                  </div>
                  {ActState.activitiesRA.length > 0 ?
                    ActState.activitiesRA.map((obj, index) => {
                      let subProyecto = obj.subproyectos_tareas !== null ?
                        obj.subproyectos_tareas.nombre_sub_proy : ""
                      return (
                        <ModernCard
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
                    }) : <PResp />
                  }
                </div>
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
