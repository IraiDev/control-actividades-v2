
import React, { useContext, useState } from 'react'
import { UiContext } from '../../context/UiContext'
import { ActivityContext } from '../../context/ActivityContext'
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu"
import { useForm } from '../../hooks/useForm'
import ListNote from '../ui/list/ListNote'
import Ptext from '../ui/text/Ptext'
import Modal from "../ui/modal/Modal"
import Button from '../ui/buttons/Button'
import TextArea from "../ui/inputs/TextArea"
import PDefaultNotes from '../ui/text/PDefaultNotes'
import moment from 'moment'
import { alertTimer, normalAlert } from '../../helpers/alerts'
import { checkForms, seekParam } from '../../helpers/auxFunctions'
import "@material-tailwind/react/tailwind.css"

let initialState = { inputEdit: '', inputAdd: '' }
let today = new Date()
today = moment(today).format('yyyy-MM-DD')

function Card(props) {
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
    numberCard
  } = props;

  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)
  const { functions: UiFunc } = useContext(UiContext)
  const [{ inputEdit, inputAdd }, onChangeValues, reset] = useForm(initialState)
  const [showModal, setShowModal] = useState(false)
  const [updateOrAdd, setUpdateOrAdd] = useState(false)
  const [noteActive, setNoteActive] = useState({ idNote: null, description: '' })

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
      lineColor = 'border-black'
      dateColor = 'text-white'
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

  return (
    <>
      <div
        className={`rounded p-4 shadow-md text-sm transition duration-500 border-2 border-transparent hover:border-gray-600 ${bgColor} ${textColor} ${actPlay}`}
        onDoubleClick={handleOpenDetails} >
        <div className="flex items-center justify-between pb-2 text-base">
          <Ptext tag="Actividad:" value={actividad} font="font-bold" />
          <div className={`flex items-center justify-between px-3 ${prioridad === 1000 ? 'bg-opacity-10' : 'bg-opacity-25'}`}>
            <Button
              icon={isActPlay ? 'fas fa-pause fa-sm' : 'fas fa-play fa-sm'}
              color=""
              hoverBgColor={`${isActPlay ? 'hover:text-red-500' : 'hover:text-green-500'} hover:bg-black hover:bg-opacity-20`}
              isOnclickeable={false}
              isTippy={true}
              offset={10}
              tippyText={isActPlay ? 'Detener tiempo' : 'Reanudar tiempo'} />
            {isActPlay && <i className="ml-2 fas fa-user-clock fa-sm"></i>}
            <p className="ml-4 mr-2 font-bold text-md">{numberCard}</p>
          </div>
        </div>
        <div className={`grid grid-cols-12 mb-2 h-52 border-b pb-3 gap-2 ${lineColor}`}>
          <div className="col-span-3 md:col-span-2 lg:col-span-3 2xl:col-span-2">
            <Ptext
              tag="Encar:"
              value={encargado}
              font="font-bold"
              isTippy={true}
              textTippy="Encargado"
            />
            <Ptext
              tag="Proy:"
              value={proyecto}
              font="font-bold"
              isTippy={true}
              textTippy="Proyecto"
            />
            <Ptext
              tag="Sub Proy:"
              value={subProyecto}
              isTippy={true}
              textTippy="Sub Proyecto"
            />
            <Ptext
              tag="Soli:"
              value={solicitante}
              isTippy={true}
              textTippy="Solicitante"
            />
            <Ptext
              tag="Est:"
              value={estado === 1 ? "Pendiente" : estado === 2 && "En trabajo"}
              isTippy={true}
              textTippy="Estado"
            />
            <Ptext
              tag="ID:"
              value={id}
              isTippy={true}
              textTippy="ID Actividad" />
            <Ptext tag="Ticket:" value={ticket} />
            <Ptext
              tag="F. Crea:"
              value={moment(fechaCrea).format('DD-MM-YY')}
              isTippy={true}
              textTippy="Fecha de creacion"
            />
            <Ptext
              tag="Transc:"
              value={`${days} Dias`}
              isTippy={true}
              textTippy="Dias transcurridos"
            />
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-4 2xl:col-span-5">
            <Ptext tag="Descripcion:" />
            <div className="h-48 scroll-row">
              <p className="px-2 leading-tight text-2xs font-semibold salto">{seekParam(desc, '- PAUSA')}</p>
            </div>
          </div>
          <div className="col-span-5">
            <Ptext tag="Informes Diarios (notas):" />
            <div className="scroll-row">
              <ul className="mt-1 text-2xs">
                {
                  notas.length > 0 ?
                    notas.map(obj => {
                      if (id === obj.id_det) {
                        return (
                          <ListNote
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
                    : <p className="text-opacity-40 pl-2">no hay notas...</p>
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 min-w-full">
          <div className="flex">
            <Ptext
              tag="Prioridad:"
              font="font-bold mr-1" />
            <Ptext
              tag={actPriority}
              font="font-bold mr-1"
              isTippy={true}
              textTippy="Prioridad ToDo" />
            <Ptext
              tag={`(${prioridadRA})`}
              font="font-bold"
              isTippy={true}
              textTippy="Prioridad RA" />
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

      {/* modal update todo */}

      <Modal showModal={showModal} onClose={showModalFalse} className="md:w-4/5 lg:w-4/6 xl:w-3/6">
        <h1 className="text-xl font-semibold mb-5">{noteActive.idNote !== null ? 'Editar Nota' : 'Agregar nueva nota'}</h1>
        <div className="w-full">
          {
            updateOrAdd ?
              <>
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
              </> :
              <>
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
              </>
          }
        </div>
        <br />
        <div className="flex justify-end">
          <Button
            className="hover:bg-blue-100 text-blue-500 hover:text-blue-700 rounded-full font-semibold"
            name={noteActive.idNote !== null ? (updateOrAdd ? 'Agregar' : 'Editar') : 'Agregar'}
            shadow={false}
            onClick={updateOrAdd ? () => handleAddNewNote() : () => handleUpdateNote()}
          >
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default Card
