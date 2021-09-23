import React, { useContext, useEffect, useState } from 'react'
import { UiContext } from '../../../context/UiContext';
import { ActivityContext } from '../../../context/ActivityContext';
import { GraphContext } from '../../../context/GraphContext';
import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem } from '@szhsin/react-menu';
import { alertTimer } from '../../../helpers/alerts';
import Select from "react-select";
import UserTimer from './UserTimer';
import Tippy from '@tippyjs/react';
import Modal from "@material-tailwind/react/Modal"
import ModalHeader from "@material-tailwind/react/ModalHeader"
import ModalBody from "@material-tailwind/react/ModalBody"
import ModalFooter from "@material-tailwind/react/ModalFooter"
import ButtonUnText from '../buttons/ButtonUnText';
import ButtonColor from '../buttons/ButtonColor';
import ButtonText from '../buttons/ButtonText';
import Button from "@material-tailwind/react/Button"
import PColor from '../text/PColor';
import "@szhsin/react-menu/dist/index.css";
import "@material-tailwind/react/tailwind.css"
import moment from 'moment';
import { types } from '../../../types/types'

const { plannerView, activitiesView, timesView } = types

const colorArray = [
  { id: "bg-gray-500", colorButton: "bg-gray-500" },
  { id: "bg-blue-600", colorButton: "bg-blue-600" },
  { id: "bg-indigo-600", colorButton: "bg-indigo-600" },
  { id: "bg-purple-600", colorButton: "bg-purple-600" },
  { id: "bg-pink-500", colorButton: "bg-pink-500" },
  { id: "bg-red-600", colorButton: "bg-red-600" },
  { id: "bg-yellow-900", colorButton: "bg-yellow-900" },
  { id: "bg-yellow-400", colorButton: "bg-yellow-400" },
  { id: "bg-green-500", colorButton: "bg-green-500" },
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
  const { functions: GraphFunc } = useContext(GraphContext)
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
    UiFunc.setViewPlanner()
    UiFunc.setIsLoading(true)
    GraphFunc.getPlannerTask()
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

  useEffect(() => {
    if (UiState.isResetFilters) {
      toggleIsWorking(false)
    }
  }, [UiState.isResetFilters])

  return (
    <>
      <div
        className="flex flex-col lg:flex-row bg-white shadow sticky top-14 z-20 pt-5 px-10">
        <div className="flex justify-between order-last w-full pb-5 lg:order-first">
          <div>
            <ButtonText disable={UiState.disableBtnSideBar} icon="fas fa-filter fa-sm" text="Filtrar" onclick={handleSideBar} />
          </div>
          <div className="flex">
            <ButtonUnText
              disable={UiState.navTab.filterPlayActivities}
              icon="fas fa-user-clock"
              tippyText={isWorking ? "Todas las actividades" : "Mostrar actividades en Play"}
              color={isWorking && 'text-blue-500'}
              isTippy={true}
              onclick={handleUserWorking} />

            <ButtonUnText
              icon="fas fa-sync-alt"
              tippyText={UiState.tabs === plannerView ? "Actualizar Planner" : UiState.tabs === activitiesView ? "Actualizar Actividades" : UiState.tabs === timesView && "Actualizar Informe de tiempos"}
              isTippy={true}
              onclick={UiState.tabs === plannerView ? updatePlannerComponents : UiState.tabs === activitiesView ? updateActivityComponents : UiState.tabs === timesView && updateTimesComponents} />
            <Menu
              direction="bottom"
              overflow="auto"
              position="anchor"
              menuButton={
                <MenuButton className="relative focus:outline-none active:outline-none">
                  {
                    ActState.userNotify.length > 0 &&
                    <label
                      className="absolute -right-1 px-1.5 text-xs text-white bg-red-500 rounded-full h-min w-min -top-0">
                      {ActState.userNotify.length}
                    </label>
                  }
                  <Tippy
                    offset={[0, 2]}
                    delay={[200, 0]}
                    placement={"bottom"}
                    content={<span>Notificaciones</span>}
                  >
                    <i className="p-2 text-gray-700 rounded-full hover:bg-gray-200 fas fa-bell"></i>
                  </Tippy>
                </MenuButton>
              }
            >
              <MenuGroup takeOverflow>
                {ActState.userNotify.length > 0 ?
                  ActState.userNotify.map((obj, index) => {
                    return (
                      <MenuItem

                        key={index}>
                        <p className="pb-3 text-sm border-b">
                          <strong>{obj.user_crea_nota.abrev_user}</strong> ha
                          creado una nota en la Actividad ID: <strong>{obj.id_det}</strong>,
                          con fecha <strong>{moment(obj.fecha_hora_crea).format('DD-MM-yyyy, HH:mm')}</strong>
                          <button
                            onClick={() => handleMarkNotifications(obj.id_nota)}>
                            <i className="ml-2 text-gray-400 fas fa-eye hover:text-red-500"></i>
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
            <ButtonUnText
              icon="fas fa-paint-brush"
              tippyText="Ajustes de usuario"
              isTippy={true}
              onclick={showModalTrue} />
          </div>
        </div>
        <div className="flex items-center justify-around order-first pb-5 lg:order-last">
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

      <Modal size="regular" active={showModal} toggler={() => showModalFalse()}>
        <ModalHeader toggler={() => showModalFalse()}>
          Colores prioridades ToDo
        </ModalHeader>
        <ModalBody>
          <label className="text-sm text-gray-500">Colores actuales:</label>
          {
            ActState.userData.usuario !== undefined && (
              <div className="flex justify-between mt-2 mb-5 w-430">
                <PColor userColor={ActState.userData.usuario.color_prioridad_baja} text="Prioridad baja" />
                <PColor userColor={ActState.userData.usuario.color_prioridad_media} text="Prioridad media" />
                <PColor userColor={ActState.userData.usuario.color_prioridad_alta} text="Prioridad alta" />
              </div>
            )
          }
          <div className="mb-5">
            <label className="text-sm text-gray-500">
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
          <div>
            <label className="text-sm text-gray-500">
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
        </ModalBody>
        <ModalFooter>
          <Button
            buttonType="link"
            size="sm"
            rounded={true}
            color="blue"
            onClick={() => handleUpdateColorPriority()}
            ripple="light"
          >
            Establecer
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default UtilityBar
