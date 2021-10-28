
import React, { useContext, useEffect, useState } from 'react'
import { UiContext } from '../../context/UiContext';
import { ActivityContext } from '../../context/ActivityContext';
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useForm } from '../../hooks/useForm';
import ListNote from '../ui/list/ListNote';
import Ptext from '../ui/text/Ptext';
import Modal from "@material-tailwind/react/Modal"
import ModalHeader from "@material-tailwind/react/ModalHeader"
import ModalBody from "@material-tailwind/react/ModalBody"
import ModalFooter from "@material-tailwind/react/ModalFooter"
import Button from "../ui/buttons/Button"
import TextArea from "../ui/inputs/TextArea"
import PDefaultNotes from '../ui/text/PDefaultNotes';
import moment from 'moment';
import ButtonUnText from '../ui/buttons/ButtonUnText';
import { alertTimer, normalAlert } from '../../helpers/alerts';
import { checkForms, seekParam } from '../../helpers/auxFunctions';
import "@material-tailwind/react/tailwind.css"
import ModernListNote from '../ui/list/ModermListNote';
import Tippy from '@tippyjs/react';

let initialState = { inputEdit: '', inputAdd: '' }
let today = new Date()
today = moment(today).format('yyyy-MM-DD')

function ModernCard(props) {
  const {
    actividad,
    encargado,
    estado,
    desc,
    id,
    solicitante,
    ticket,
    proyecto,
    subProyecto,
    pausas,
    prioridad,
    prioridadRA,
    notas,
    fechaCrea,
    numberCard,
    type = 'card',
    expand
  } = props;

  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)
  const { functions: UiFunc } = useContext(UiContext)
  const [{ inputEdit, inputAdd }, onChangeValues, reset] = useForm(initialState)
  const [showModal, setShowModal] = useState(false)
  const [updateOrAdd, setUpdateOrAdd] = useState(false)
  const [noteActive, setNoteActive] = useState({ idNote: null, description: '' })
  const [isExpand, setIsExpand] = useState(false)

  let dateTo = moment(fechaCrea)
  let days = dateTo.diff(today, 'days') - (dateTo.diff(today, 'days') * 2)
  let dateColor, textColor, lineColor, bgColor, actPriority, actPlay = '', isActPlay = false

  switch (prioridad) {
    case 600:
      bgColor = ActState.userData.usuario.color_prioridad_baja
      textColor = 'text-white'
      lineColor = 'border-white'
      dateColor = 'text-white'
      actPriority = 'Baja'
      break;
    case 400:
      bgColor = ActState.userData.usuario.color_prioridad_media
      textColor = 'text-white'
      lineColor = 'border-white'
      dateColor = 'text-white'
      actPriority = 'Media'
      break;
    case 100:
      bgColor = ActState.userData.usuario.color_prioridad_alta
      textColor = 'text-white'
      lineColor = 'border-white'
      dateColor = 'text-white'
      actPriority = 'Alta'
      break;
    default:
      bgColor = 'bg-white hover:bg-gray-50'
      textColor = 'text-gray-600'
      lineColor = 'border-gray-500'
      dateColor = 'text-black'
      actPriority = 'S/P'
      break;
  }

  if (pausas.length > 0 && estado === 2) {
    if (pausas[pausas.length - 1].boton === 2) {
      isActPlay = true
      actPlay = 'border-4 border-black border-opacity-25'
    }
    else {
      isActPlay = false
      actPlay = ''
    }
  }

  // funciones controladoras de eventos
  const handleUpdatePriority = (id, priority) => {
    let data = { prioridad_numero: priority, id_actividad: id, }
    ActFunc.updatePriority(data)
  }

  const handleAddNewNote = () => {

    const vDesc = checkForms(inputAdd)
    if (vDesc.state) {
      normalAlert('warning', `Caracter <b class="text-gray-600 text-xl">${vDesc.char}</b> no pemitido, campo: <b>Nota</b> <br><br> <i class="text-blue-500">Caracteres no permitidos:</i> <b>${vDesc.list}</b>`, 'Entiendo')
      return
    }

    const data = { id_actividad: id, description: inputAdd }
    const action = () => {
      ActFunc.addNewNote(data)
      showModalFalse()
    }
    let state = inputAdd !== ''
    alertTimer(state, 'info', 1500, 'No puedes agregar una nota vacia') && action()
  }

  const handleUpdateNote = () => {

    const vDesc = checkForms(inputEdit)
    if (vDesc.state) {
      normalAlert('warning', `Caracter <b class="text-gray-600 text-xl">${vDesc.char}</b> no pemitido, campo: <b>Nota</b> <br><br> <i class="text-blue-500">Caracteres no permitidos:</i> <b>${vDesc.list}</b>`, 'Entiendo')
      return
    }

    const dataUpdate = { id_nota: noteActive.idNote, description: inputEdit }
    const actionUpdate = () => {
      ActFunc.updateNote(dataUpdate)
      showModalFalse()
    }
    const dataAdd = { id_actividad: id, description: inputEdit }
    const actionAdd = () => {
      ActFunc.addNewNote(dataAdd)
      showModalFalse()
    }
    if (noteActive.idNote !== null) {
      let state = inputEdit !== ''
      alertTimer(state, 'info', 1500, 'LLena el campo nota para actualizar') && actionUpdate()
    } else {
      let state = inputEdit !== ''
      alertTimer(state, 'info', 1500, 'No puedes agregar una nota vacia') && actionAdd()
    }
  }

  const showModalUpdateNote = () => {
    setShowModal(true)
    setUpdateOrAdd(false)
  }

  const showModalAddNote = () => {
    setShowModal(true)
    setUpdateOrAdd(true)
  }

  const showModalFalse = () => {
    initialState.inputEdit = ''
    setNoteActive({ idNote: null, description: '' })
    setShowModal(false)
    reset()
  }

  const handleGetidNote = (idNote, description) => {
    reset()
    setNoteActive({ idNote, description })
    initialState.inputEdit = description
  }

  const handleOpenDetails = async () => {
    await UiFunc.setIsLoading(true)
    await ActFunc.getActivityDetail(id)
    await UiFunc.setAllOrDetails(false)
    await UiFunc.detailsView(true, true)
  }

  const handleExpand = () => {
    setIsExpand(!isExpand)
  }

  useEffect(() => {
    if (expand) {
      setIsExpand(true)
    }
    else {
      setIsExpand(false)
    }
  }, [expand])

  return (
    <>
      {
        type === 'card' &&
        <div
          className={`grid grid-cols-1 p-3 bg-white rounded-md shadow-xl text-xs font-semibold transition duration-500 border-2 border-transparent hover:border-gray-600 ${bgColor} ${textColor} ${actPlay}`}
          onDoubleClick={handleOpenDetails}>
          <div>
            <h5 className="font-bold text-base mb-2">{numberCard} - <p className="inline capitalize">{actividad}</p></h5>
            <div className="grid grid-cols-2 mb-2">
              <div>
                <Ptext tag="Encargado: " value={encargado} font="font-bold" />
                <Ptext tag="Proyecto: " value={proyecto} font="font-bold" />
                <Ptext tag="Sub proyecto: " value={subProyecto} />
                <Ptext tag="Solicitante: " value={solicitante} />
                <Ptext tag="Estado: " value={estado === 1 ? "Pendiente" : estado === 2 && "En trabajo"} />
              </div>
              <div>
                <Ptext tag="ID: " value={id} />
                <Ptext tag="Ticket: " value={ticket === 0 ? 'S/T' : ticket} />
                <Ptext tag="Fecha: " value={moment(fechaCrea).format('DD-MM-YY')} />
                <Ptext tag="Transcurridos: " value={`${days} Dias`} />
                <Ptext tag="Prioridad: " value={`${actPriority} (${prioridadRA})`} />
              </div>
            </div>
            <div className="mb-2">
              <p className="text-opacity-75 font-bold ">Descripcion</p>
              <p className="scroll-row salto">{seekParam(desc, '- PAUSA')}</p>
            </div>
            <div>
              <p className="text-opacity-75 font-bold">Notas</p>
              <ul className="mt-1 font-normal scroll-row">
                {
                  notas.length > 0 ?
                    notas.map(obj => {
                      if (id === obj.id_det) {
                        return (
                          <ModernListNote
                            key={obj.id_nota}
                            desc={obj.desc_nota}
                            date={obj.fecha_hora_crea}
                            user={obj.user_crea}
                            dateColor={dateColor}
                          />
                        )
                      } else {
                        return ''
                      }
                    })
                    : <p className="text-opacity-10 pl-2">no hay notas...</p>
                }
              </ul>
            </div>
          </div>
          <div className={`flex justify-between items-center place-self-end w-full border-t mt-2 ${lineColor}`}>
            <div className="flex items-center justify-between pt-1">
              {isActPlay && <i className="ml-2 fas fa-user-clock fa-sm"></i>}
              <ButtonUnText
                icon={isActPlay ? 'fas fa-pause fa-sm' : 'fas fa-play fa-sm'}
                color=""
                hoverBgColor={`${isActPlay ? 'hover:text-red-500' : 'hover:text-green-500'}`}
                isOnclickeable={false}
                isTippy={true}
                offset={10}
                tippyText={isActPlay ? 'Detener tiempo' : 'Reanudar tiempo'} />
            </div>
            <div>
              <Menu
                direction="left"
                menuButton={
                  <MenuButton className="focus:outline-none active:outline-none h-7 w-7 rounded-full transition duration-500 hover:bg-black hover:bg-opacity-25 mt-1">
                    <i className="fas fa-ellipsis-v"></i>
                  </MenuButton>
                }
              >
                <MenuItem
                  className="font-medium text-left"
                  onClick={() => {
                    showModalAddNote();
                  }}
                >
                  Agregar Nota
                </MenuItem>
                <MenuItem
                  className="font-medium text-left"
                  onClick={() => {
                    showModalUpdateNote();
                  }}
                >
                  Agregar/Editar Nota
                </MenuItem>
                <MenuItem
                  className="flex justify-between"
                  onClick={() => {
                    handleUpdatePriority(id, 100);
                  }}
                >
                  <p className="font-medium">Prioridad Alta</p>
                  <p
                    className={`p-2 ml-3 ${ActState.userData.usuario.color_prioridad_alta} rounded-full focus:outline-none active:outline-none`}
                  ></p>
                </MenuItem>
                <MenuItem
                  className="flex justify-between"
                  onClick={() => {
                    handleUpdatePriority(id, 400);
                  }}
                >
                  <p className="font-medium">Prioridad Media</p>
                  <p
                    className={`p-2 ml-3 ${ActState.userData.usuario.color_prioridad_media} rounded-full focus:outline-none active:outline-none`}
                  ></p>
                </MenuItem>
                <MenuItem
                  className="flex justify-between"
                  onClick={() => {
                    handleUpdatePriority(id, 600);
                  }}
                >
                  <p className="font-medium">Prioridad Baja</p>
                  <p
                    className={`p-2 ml-3 ${ActState.userData.usuario.color_prioridad_baja} rounded-full focus:outline-none active:outline-none`}
                  ></p>
                </MenuItem>
                <MenuItem
                  className="flex justify-between"
                  onClick={() => {
                    handleUpdatePriority(id, 1000);
                  }}
                >
                  <p className="font-medium">Sin Prioridad</p>
                  <p
                    className={`p-2 ml-3 bg-gray-200 rounded-full focus:outline-none active:outline-none`}
                  ></p>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      }
      {
        type === 'list' &&
        <div
          className={`grid grid-cols-12 my-2 shadow-sm rounded-md min-w-fake-table border hover:border-gray-700 transition duration-500 ${bgColor} ${textColor} ${actPlay}`}
          onDoubleClick={handleOpenDetails}
        >
          <div className="p-2 col-span-1 font-semibold text-base">{id}</div>
          <div className="p-2 col-span-1">{ticket === 0 ? '--' : ticket}</div>
          <div className="p-2 col-span-1 font-semibold text-base">{proyecto}</div>
          <div className="p-2 col-span-1">{subProyecto === '' ? '--' : subProyecto}</div>
          <div className="p-2 col-span-1 text-base">{solicitante}</div>
          <div className="p-2 col-span-1 font-semibold text-base">{encargado}</div>
          <div className="p-2 col-span-1 font-semibold text-left">
            <Tippy
              disabled={isExpand}
              offset={[0, 6]}
              placement="bottom"
              delay={[100, 0]}
              content={<span>{actividad}</span>}
            >
              <p className={!isExpand && 'truncate'}>{actividad}</p>
            </Tippy>
          </div>
          <div className="p-2 col-span-3 text-justify flex items-start justify-between">
            <Tippy
              disabled={isExpand}
              offset={[0, 6]}
              placement="bottom"
              delay={[100, 0]}
              content={<span>{desc}</span>}
            >
              <p className={!isExpand ? 'truncate' : 'salto'}>{seekParam(desc, '- PAUSA')}</p>
            </Tippy>
            <Button type="icon" icon={isExpand ? 'fas fa-angle-up' : 'fas fa-angle-down'} className="ml-2" shadow={false} onClick={handleExpand} />
          </div>
          <div className="p-2 col-span-1 font-semibold text-base">{estado === 1 ? "Pendiente" : estado === 2 && "En trabajo"}</div>
          <div className="p-2 col-span-1 flex mx-auto items-center">
            <Button
              type="icon"
              className={isActPlay ? 'hover:text-red-500' : 'hover:text-green-500'}
              icon={isActPlay ? 'fas fa-pause fa-sm' : 'fas fa-play fa-sm'}
              isTippy={true}
              offset={10}
              tippyText={isActPlay ? 'Detener tiempo' : 'Reanudar tiempo'} />
            <Menu
              direction="left"
              menuButton={
                <MenuButton className="focus:outline-none active:outline-none h-7 w-7 rounded-full transition duration-500 hover:bg-black hover:bg-opacity-25 ml-5">
                  <i className="fas fa-bars"></i>
                </MenuButton>
              }
            >
              {/* <MenuItem
                className="font-medium text-left"
                onClick={() => {
                  showModalAddNote();
                }}
              >
                Agregar Nota
              </MenuItem>
              <MenuItem
                className="font-medium text-left"
                onClick={() => {
                  showModalUpdateNote();
                }}
              >
                Agregar/Editar Nota
              </MenuItem> */}
              <MenuItem
                className="flex justify-between"
                onClick={() => {
                  handleUpdatePriority(id, 100);
                }}
              >
                <p className="font-medium">Prioridad Alta</p>
                <p
                  className={`p-2 ml-3 ${ActState.userData.usuario.color_prioridad_alta} rounded-full focus:outline-none active:outline-none`}
                ></p>
              </MenuItem>
              <MenuItem
                className="flex justify-between"
                onClick={() => {
                  handleUpdatePriority(id, 400);
                }}
              >
                <p className="font-medium">Prioridad Media</p>
                <p
                  className={`p-2 ml-3 ${ActState.userData.usuario.color_prioridad_media} rounded-full focus:outline-none active:outline-none`}
                ></p>
              </MenuItem>
              <MenuItem
                className="flex justify-between"
                onClick={() => {
                  handleUpdatePriority(id, 600);
                }}
              >
                <p className="font-medium">Prioridad Baja</p>
                <p
                  className={`p-2 ml-3 ${ActState.userData.usuario.color_prioridad_baja} rounded-full focus:outline-none active:outline-none`}
                ></p>
              </MenuItem>
              <MenuItem
                className="flex justify-between"
                onClick={() => {
                  handleUpdatePriority(id, 1000);
                }}
              >
                <p className="font-medium">Sin Prioridad</p>
                <p
                  className={`p-2 ml-3 bg-gray-200 rounded-full focus:outline-none active:outline-none`}
                ></p>
              </MenuItem>
            </Menu>
          </div>
        </div>
      }

      {/* modal update todo */}

      <Modal size="lg" active={showModal} toggler={() => showModalFalse()}>
        <ModalHeader toggler={() => showModalFalse()}>
          {
            noteActive.idNote !== null ? 'Editar Nota' : 'Agregar nueva nota'
          }
        </ModalHeader>
        <ModalBody>
          {
            updateOrAdd ?
              (<div className="w-600">
                <label className="text-xs">Mensajes predeterminados:</label>
                <div className="py-3 pl-3 pr-1 mx-auto mt-1 mb-5 bg-gray-100 rounded-md">
                  <PDefaultNotes idAct={id} noteText="Inicializar actividad urgente" onclick={showModalFalse} updatePriority={true} />
                  <PDefaultNotes idAct={id} noteText="esperando respuesta de cliente" onclick={showModalFalse} />
                  <PDefaultNotes idAct={id} noteText="esperando actividad.." onclick={showModalFalse} />
                  <PDefaultNotes idAct={id} noteText="trabajando..." onclick={showModalFalse} />
                  <PDefaultNotes idAct={id} noteText="sin avance" onclick={showModalFalse} />
                  <PDefaultNotes idAct={id} noteText="en cola" onclick={showModalFalse} isSeparator={false} />
                </div>
                <TextArea
                  field="Descripcion nota"
                  value={inputAdd}
                  name="inputAdd"
                  onChange={onChangeValues} />
              </div>) :
              (<div className="w-600">
                <label className="mb-2 text-xs">Notas:</label>
                <ul className="min-h-80 scroll-row">
                  {
                    notas.length > 0 ?
                      notas.map(obj => {
                        if (id === obj.id_det) {
                          return (
                            <ListNote
                              isModal={true}
                              key={obj.id_nota}
                              idNote={obj.id_nota}
                              desc={obj.desc_nota}
                              date={obj.fecha_hora_crea}
                              user={obj.user_crea}
                              dateColor={dateColor}
                              onclick={handleGetidNote}
                              activeColor={noteActive.idNote === obj.id_nota ? 'text-green-600' : 'text-gray-500'}
                            />
                          )
                        } else {
                          return ''
                        }
                      }) : <p className="text-xs text-gray-400 pl-2">No hay notas...</p>
                  }
                </ul>
                <br />
                <TextArea
                  field="Descripcion nota"
                  value={inputEdit}
                  name="inputEdit"
                  onChange={onChangeValues} />
              </div>)
          }
        </ModalBody>
        <ModalFooter>
          <Button
            buttonType="link"
            size="sm"
            rounded={true}
            color="blue"
            onClick={updateOrAdd ? () => handleAddNewNote() : () => handleUpdateNote()}
            ripple="light"
          >
            {noteActive.idNote !== null ? (updateOrAdd ? 'Agregar' : 'Editar') : 'Agregar'}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ModernCard
