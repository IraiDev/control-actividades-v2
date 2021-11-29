import React, { useContext, useEffect, useState } from 'react'
import { UiContext } from '../../../context/UiContext'
import { ActivityContext } from '../../../context/ActivityContext'
import { GraphContext } from '../../../context/GraphContext'
import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem } from '@szhsin/react-menu'
import Select from 'react-select'
import UserTimer from './UserTimer'
import TextContent from '../text/TextContent'
import Tippy from '@tippyjs/react'
import Modal from '../modal/Modal'
import ButtonColor from '../buttons/ButtonColor'
import Button from '../buttons/Button'
import '@szhsin/react-menu/dist/index.css'
import { types } from '../../../types/types'
import moment from 'moment'
import { useWindowSize } from '../../../hooks/useWindowSize'
import { Alert } from '../../../helpers/alert'

const { plannerView, activitiesView, timesView, detailsView } = types

const colorArray = [
  { id: "bg-gray-500", colorButton: "bg-gray-500 hover:bg-gray-600" },
  { id: "bg-blue-600", colorButton: "bg-blue-600 hover:bg-blue-700" },
  { id: "bg-indigo-600", colorButton: "bg-indigo-600 hover:bg-indigo-700" },
  { id: "bg-purple-600", colorButton: "bg-purple-600 hover:bg-purple-700" },
  { id: "bg-pink-500", colorButton: "bg-pink-500 hover:bg-pink-600" },
  { id: "bg-red-600", colorButton: "bg-red-600 hover:bg-red-500" },
  { id: "bg-yellow-900", colorButton: "bg-yellow-900 hover:bg-yellow-700" },
  { id: "bg-yellow-400", colorButton: "bg-yellow-400  hover:bg-yellow-500" },
  { id: "bg-green-500", colorButton: "bg-green-500  hover:bg-green-600" },
];

const selectArray = [
  { value: 600, label: "Prioridad Baja" },
  { value: 400, label: "Prioridad Media" },
  { value: 100, label: "Prioridad Alta" },
]

const initialState = {
  value: null,
  label: 'Seleccione una prioridad'
}

function UtilityBar() {
  const { states: UiState, functions: UiFunc } = useContext(UiContext)
  const { functions: GraphFunc, states: GraphState } = useContext(GraphContext)
  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)
  const [priority, setPriority] = useState(initialState)
  const [colorSelected, setColorSelected] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isWorking, toggleIsWorking] = useState(false)
  const size = useWindowSize();

  const handleUpdateColorPriority = () => {
    if (priority.value === null || colorSelected === null) {
      Alert({
        icon: 'warn',
        title: 'Atencion',
        content: 'Debes seleccionar primero una prioridad y luego un color para realizar el cambio de color de prioridad',
        showCancelButton: false,
        timer: 5000
      })
      return
    }
    const data = { prioridad_numero: priority.value, prioridad_color: colorSelected }
    ActFunc.updateUserColors(data)
    showModalFalse()
  }

  const showModalFalse = () => {
    setPriority(initialState)
    setColorSelected(null)
    setShowModal(false)
  }

  const updateTimesComponents = () => {
    const dateFormat = moment(new Date()).format('yyyy-MM-DD')
    UiFunc.setIsLoading(true)
    ActFunc.getInfoTimes(dateFormat)
  }

  const updatePlannerComponents = () => {
    if (UiState.isTodoOrPlanner) GraphFunc.getTodoTask(GraphState.idListSelected)
    else { GraphFunc.getPlannerTask() }
    UiFunc.setIsLoading(true)
  }

  const updateActivityComponents = () => {
    // UiFunc.setViewActivities()
    UiFunc.setIsLoading(true)
    ActFunc.getActivities()
  }

  const handleUserWorking = () => {
    UiFunc.setIsLoading(true)
    toggleIsWorking(!isWorking)
    if (!isWorking) {
      let param = UiFunc.saveFilters('entrabajo', 'entrabajo=2&')
      ActFunc.getActivities(param)
    }
    else {
      let param = UiFunc.saveFilters('entrabajo', 'entrabajo=&')
      ActFunc.getActivities(param)
    }
  }

  const handleGoActivity = (idAct) => {
    const param = `id_actividad=${idAct}`
    if (UiState.tabs !== activitiesView) {
      UiFunc.activityView()
      ActFunc.getActivities(param)
    }
    else {
      ActFunc.getActivities(param)
    }
  }

  useEffect(() => {
    if (UiState.isResetFilters) {
      toggleIsWorking(false)
    }
  }, [UiState.isResetFilters])

  return (
    <>
      <div
        className="flex flex-col lg:flex-row items-center bg-white shadow min-w-full sticky top-14 z-20 pt-5 px-3 sm:px-5 md:px-10">
        <div className={`flex order-last w-full pb-5 lg:order-first justify-between`}>
          <div>
            <Button
              disabled={UiState.disableBtnSideBar}
              className="rounded-full px-4 py-1 bg-gray-100  hover:bg-gray-50 hover:text-blue-500"
              shadow
              type="iconText"
              icon="fas fa-filter fa-sm"
              name="Filtrar"
              onClick={() => UiFunc.setToggleSideBar()} />
            <Button
              disabled={UiState.tabs !== plannerView || size.width > 1024}
              className="rounded-full px-4 py-1 bg-gray-100  hover:bg-gray-50 hover:text-blue-500"
              shadow
              type="iconText"
              icon="fas fa-list-ul fa-sm"
              name="menu"
              onClick={() => UiFunc.setToggleSideMenu(!UiState.toggleSideMenu)} />
          </div>
          <div className="flex">
            <div className="md:hidden">
              <Menu
                direction="bottom"
                overflow="auto"
                position="anchor"
                menuButton={
                  <MenuButton className="transition duration-500 relative focus:outline-none active:outline-none h-8 w-8 text-gray-700 rounded-full hover:bg-gray-300">
                    <Tippy
                      offset={[0, 20]}
                      delay={[700, 0]}
                      placement={"bottom"}
                      content={<span>Mostrar tiempo de usuarios</span>}
                    >
                      <i className="fas fa-clock"></i>
                    </Tippy>
                  </MenuButton>
                }
              >
                <MenuGroup takeOverflow>
                  {ActState.usersTimes.length > 0 ?
                    ActState.usersTimes.map((obj, index) => {
                      return (
                        <MenuItem
                          disabled
                          key={index}>
                          <UserTimer
                            key={index}
                            user={obj.usuario}
                            time={obj.tiempo}
                            isPause={obj.estado}
                          />
                        </MenuItem>
                      );
                    })
                    :
                    <MenuItem>
                      <p>No hay informacion</p>
                    </MenuItem>
                  }
                </MenuGroup>
              </Menu>
            </div>
            <Button
              disabled={UiState.navTab.disabled !== activitiesView}
              className={`h-8 w-8 hover:bg-gray-200 rounded-full ${isWorking && 'text-blue-500'}`}
              type="icon"
              icon="fas fa-user-clock"
              tippyText={isWorking ? "Todas las actividades" : "Mostrar actividades en Play"}
              onClick={handleUserWorking} />
            <Button
              disabled={UiState.navTab.disabled === detailsView}
              className="h-8 w-8 hover:bg-gray-200 rounded-full"
              type="icon"
              icon="fas fa-sync-alt"
              tippyText={UiState.tabs === plannerView ? "Actualizar Planner o to-do" : UiState.tabs === activitiesView ? "Actualizar Actividades" : UiState.tabs === timesView && "Actualizar Informe de tiempos"}
              onClick={UiState.tabs === plannerView ? updatePlannerComponents : UiState.tabs === activitiesView ? updateActivityComponents : UiState.tabs === timesView && updateTimesComponents} />
            <Menu
              className="z-50"
              direction="bottom"
              overflow="auto"
              position="anchor"
              menuButton={
                <MenuButton
                  className="transition duration-500 relative focus:outline-none active:outline-none h-8 w-8 text-gray-700 rounded-full hover:bg-gray-300">
                  {
                    ActState.userNotify.length > 0 &&
                    <label
                      className="absolute -right-1 px-1.5 text-xs text-white bg-red-500 rounded-full h-min w-min -top-0">
                      {ActState.userNotify.length}
                    </label>
                  }
                  <Tippy
                    offset={[0, 20]}
                    delay={[700, 0]}
                    placement={"bottom"}
                    content={<span>Notificaciones</span>}
                  >
                    <i className="fas fa-bell"></i>
                  </Tippy>
                </MenuButton>
              }
            >
              <MenuGroup className="z-50" takeOverflow>
                {
                  ActState.userNotify.length > 0 ?
                    ActState.userNotify.map(note => (
                      <MenuItem
                        key={note.id_nota}>
                        <div className="pb-3 text-sm border-b text-transparent hover:text-gray-400 w-64 flex justify-between items-center">
                          <p className="text-gray-800 w-max"
                            onClick={() => handleGoActivity(note.id_det)}>
                            Nueva nota en Actividad: <b>{note.id_det}</b>
                            <br />
                            Con fecha: <b>{moment(note.fecha_hora_crea).format('DD-MM-yyyy, HH:MM')}</b>
                            <br />
                            Creador: <b>{note.user_crea_nota.abrev_user}</b>
                          </p>
                          <Button
                            className="outline-none focus:outline-none hover:text-red-500"
                            type="icon"
                            icon="ml-2 fas fa-eye-slash"
                            onClick={() => ActFunc.markNotifications({ id_nota: note.id_nota })} />
                        </div>
                      </MenuItem>
                    ))
                    :
                    <MenuItem disabled>
                      <p className="text-sm">No hay notificaciones...</p>
                    </MenuItem>
                }
              </MenuGroup>
              <MenuItem
                disabled={ActState.userNotify.length <= 0}
                onClick={() => ActFunc.markNotifications()}
              >
                <div className={`flex items-center mx-auto text-gray-400 ${ActState.userNotify.length > 0 && 'hover:text-red-500'}`}>
                  Marcar como vistas
                  <i className="ml-3 fas fa-eye-slash"></i>
                </div>
              </MenuItem>
            </Menu>
            <Button
              className="h-8 w-8 hover:bg-gray-200 rounded-full"
              type="icon"
              icon="fas fa-paint-brush"
              tippyText="Ajustes de usuario"
              onClick={() => setShowModal(true)} />
          </div>
        </div>
        <div className="md:flex items-center justify-around order-first pb-5 lg:order-last hidden">
          {ActState.usersTimes.length > 0 &&
            ActState.usersTimes.map((obj, index) => {
              return (
                <UserTimer
                  key={index}
                  user={obj.usuario}
                  time={obj.tiempo}
                  isPause={obj.estado}
                />
              );
            })}
        </div>
      </div>

      {/* modal update todo */}

      <Modal showModal={showModal} onClose={showModalFalse} className="max-w-xl">
        <h1 className="text-xl font-semibold mb-5">Colores prioridades ToDo</h1>
        <div className="w-full">
          <label className="text-2xs">Colores actuales:</label>
          {
            ActState.userData.usuario !== undefined && (
              <div className="flex justify-between mt-2 mb-5 w-full">
                <TextContent className="text-2xs text-gray-400" type="color" value={ActState.userData.usuario.color_prioridad_baja} tag="Prioridad baja" />
                <TextContent className="text-2xs text-gray-400" type="color" value={ActState.userData.usuario.color_prioridad_media} tag="Prioridad media" />
                <TextContent className="text-2xs text-gray-400" type="color" value={ActState.userData.usuario.color_prioridad_alta} tag="Prioridad alta" />
              </div>
            )
          }
          <div className="mb-5">
            <label className="text-2xs">
              Prioridad:
            </label>
            <Select
              placeholder="seleccione una opcion"
              className="mt-2"
              options={selectArray}
              onChange={(option) => {
                setColorSelected(null)
                setPriority(option)
              }}
              value={priority}
            />
          </div>
          <div className="mb-5">
            <label className="text-2xs">
              Seleccione un color:
            </label>
            <div className="mt-2">
              {colorArray.map((obj) => {
                return (
                  <ButtonColor
                    key={obj.id}
                    color={obj.colorButton}
                    setColor={(color) => setColorSelected(color)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="hover:bg-blue-100 text-blue-500 hover:text-blue-700 rounded-full"
            name="Actualizar"
            onClick={() => handleUpdateColorPriority()}
          />
        </div>
      </Modal>
    </>
  )
}

export default UtilityBar
