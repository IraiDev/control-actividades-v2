import React, { useContext, useEffect, useState } from 'react'
import { UiContext } from '../../../context/UiContext'
import { ActivityContext } from '../../../context/ActivityContext'
import { GraphContext } from '../../../context/GraphContext'
import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem } from '@szhsin/react-menu'
import { alertTimer } from '../../../helpers/alerts'
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

  const handleSideBar = () => {
    UiFunc.setToggleSideBar()
  }

  const onChangeSelect = (option) => {
    setColorSelected('')
    setPriority(option)
  }

  const handleSelectColor = (color) => {
    setColorSelected(color)
  }

  const handleUpdateColorPriority = () => {
    console.log(colorSelected);
    const data = { prioridad_numero: priority.value, prioridad_color: colorSelected }
    const action = () => {
      ActFunc.updateUserColors(data)
      showModalFalse()
    }
    const state = (priority.value !== null && colorSelected !== null)
    alertTimer(state, 'info', 1500, 'Debe seleccionar una prioridad y un color.') && action()
  }

  const showModalTrue = () => {
    setShowModal(true)
  }

  const showModalFalse = () => {
    setPriority(initialState)
    setColorSelected(null)
    setShowModal(false)
  }

  const updateTimesComponents = () => {
    const date = new Date()
    const dateFormat = moment(date).format('yyyy-MM-DD')
    const param = `fecha=${dateFormat}`
    UiFunc.setIsLoading(true)
    ActFunc.getTimes()
    ActFunc.getNotify()
    ActFunc.getInfoTimes(param)
  }

  const updatePlannerComponents = () => {
    if (UiState.isTodoOrPlanner) {
      GraphFunc.getTodoTask(GraphState.idListSelected)
    }
    else {
      GraphFunc.getPlannerTask()
    }
    UiFunc.setIsLoading(true)
    ActFunc.getTimes()
    ActFunc.getNotify()
  }

  const updateActivityComponents = () => {
    UiFunc.setViewActivities()
    UiFunc.setIsLoading(true)
    ActFunc.getActivities()
    ActFunc.getTimes()
    ActFunc.getNotify()
  }

  const handleUserWorking = () => {
    UiFunc.setIsLoading(true)
    ActFunc.getTimes()
    ActFunc.getNotify()
    toggleIsWorking(!isWorking)
    if (!isWorking) {
      let param = UiFunc.saveFilters('entrabajo', 'entrabajo=2&')
      ActFunc.getActivities(param)
      return
    }
    let param = UiFunc.saveFilters('entrabajo', 'entrabajo=&')
    ActFunc.getActivities(param)
  }

  const handleMarkAllNotifications = () => {
    ActFunc.markNotifications()
  }

  const handleMarkNotifications = (idNote) => {
    const data = {
      id_nota: idNote
    }
    ActFunc.markNotifications(data)
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
        className="flex flex-col lg:flex-row items-center bg-white shadow min-w-full sticky top-14 z-20 pt-5 px-10">
        <div className={`flex order-last w-full pb-5 lg:order-first ${UiState.disableBtnSideBar ? 'justify-center lg:justify-end' : 'justify-between'}`}>
          <div>
            <Button
              disabled={UiState.disableBtnSideBar}
              className="rounded-full px-4 py-1 bg-gray-100  hover:bg-gray-50 hover:text-blue-500"
              shadow
              type="iconText"
              icon="fas fa-filter fa-sm"
              name="Filtrar"
              onClick={handleSideBar} />
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
              <MenuGroup takeOverflow>
                {
                  ActState.userNotify.length > 0 ?
                    ActState.userNotify.map((obj, index) => {
                      return (
                        <MenuItem
                          onClick={() => handleGoActivity(obj.id_det)}
                          key={index}>
                          <p className="pb-3 text-sm border-b text-transparent hover:text-gray-400">
                            <strong className="text-black">{obj.user_crea_nota.abrev_user}</strong><i className="text-black">, ha
                              creado una nota en la Actividad:</i> <strong className="text-black">{obj.id_det}</strong><i className="text-black">,
                                con fecha</i> <strong className="text-black">{moment(obj.fecha_hora_crea).format('DD-MM-yyyy')}</strong>
                            <button
                              className="outline-none focus:outline-none"
                              onClick={() => handleMarkNotifications(obj.id_nota)}>
                              <i className="ml-2 fas fa-eye-slash hover:text-red-500"></i>
                            </button>
                          </p>
                        </MenuItem>
                      );
                    })
                    :
                    <MenuItem>
                      <p>no hay notificaciones</p>
                    </MenuItem>
                }
              </MenuGroup>
              <MenuDivider />
              <MenuItem
                disabled={ActState.userNotify.length <= 0}
                onClick={() => handleMarkAllNotifications()}
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
              onClick={showModalTrue} />
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
              onChange={onChangeSelect}
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
                    setColor={handleSelectColor}
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
