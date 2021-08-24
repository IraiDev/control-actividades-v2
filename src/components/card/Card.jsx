
import React, { useContext, useState } from 'react'
import { ActivityContext } from '../../context/ActivityContext';
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useForm } from '../../hooks/useForm';
import ListNote from '../ui/list/ListNote';
import Ptext from '../ui/text/Ptext';
import Modal from "@material-tailwind/react/Modal"
import ModalHeader from "@material-tailwind/react/ModalHeader"
import ModalBody from "@material-tailwind/react/ModalBody"
import ModalFooter from "@material-tailwind/react/ModalFooter"
import Button from "@material-tailwind/react/Button"
import Textarea from "@material-tailwind/react/Textarea"
import "@material-tailwind/react/tailwind.css"
import PDefaultNotes from '../ui/text/PDefaultNotes';
import { alertTimer } from '../../helpers/alerts';
import moment from 'moment';

let dateColor, textColor, lineColor, bgColor, actPriority, actPlay, isActPlay
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
    pausa,
    prioridad,
    prioridadRA,
    notas,
    fechaCrea
  } = props;

  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)
  const [{ inputEdit, inputAdd }, onChangeValues, reset] = useForm(initialState)
  const [showModal, setShowModal] = useState(false)
  const [updateOrAdd, setUpdateOrAdd] = useState(false)
  const [noteActive, setNoteActive] = useState({ idNote: null, description: '' })

  let dateTo = moment(fechaCrea)
  let days = dateTo.diff(today, 'days') - (dateTo.diff(today, 'days') * 2)

  switch (prioridad) {
    case 600:
      bgColor = ActState.userData.usuario.color_prioridad_baja
      textColor = 'text-white'
      lineColor = 'border-white'
      dateColor = 'text-white'
      actPriority = 'Prioridad baja'
      break;
    case 400:
      bgColor = ActState.userData.usuario.color_prioridad_media
      textColor = 'text-white'
      lineColor = 'border-white'
      dateColor = 'text-white'
      actPriority = 'Prioridad media'
      break;
    case 100:
      bgColor = ActState.userData.usuario.color_prioridad_alta
      textColor = 'text-white'
      lineColor = 'border-white'
      dateColor = 'text-white'
      actPriority = 'Prioridad alta'
      break;
    default:
      bgColor = 'bg-white'
      textColor = 'text-gray-600'
      lineColor = 'border-black'
      dateColor = 'text-white'
      actPriority = 'Sin prioridad'
      break;
  }

  if (pausa.length > 0) {
    if (pausa[pausa.length - 1].boton === 2) {
      isActPlay = true
      actPlay = 'border-4 border-black border-opacity-25'
    } else {
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
    const data = { id_actividad: id, description: inputAdd }
    const action = () => {
      ActFunc.addNewNote(data)
      showModalFalse()
    }
    let state = inputAdd !== ''
    alertTimer(state, 'info', 1500, 'No puedes agregar una nota vacia') && action()
  }

  const handleUpdateNote = () => {
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

  return (
    <>
      <div className={`rounded p-4 shadow-md text-sm ${bgColor} ${textColor} ${actPlay}`}>
        <div className="flex items-center justify-between pb-2 text-base">
          <Ptext tag="Actividad:" value={actividad} font="font-bold" />
          {isActPlay && (<i className="fas fa-user-clock"></i>)}
        </div>
        <div className={`grid grid-cols-12 mb-2 h-48 border-b pb-3 gap-2 ${lineColor}`}>
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
              value={estado === 1 ? "Pendiente" : estado === 2 ? "En trabajo" : ""}
              isTippy={true}
              textTippy="Estado"
            />
            <Ptext tag="Ticket:" value={ticket} />
            <Ptext tag="ID:" value={id} />
          </div>
          <div className="col-span-4 2xl:col-span-5">
            <Ptext tag="Descripcion:" />
            <div className="h-48 scroll-row">
              <p className="px-2 font-semibold leading-tight">{desc}</p>
            </div>
          </div>
          <div className="col-span-5">
            <Ptext tag="Informes Diarios (notas):" />
            <div className="scroll-row">
              <ul className="mt-1">
                {
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
                  }).reverse()
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <Ptext
            tag="Prioridad:"
            value={actPriority}
            font="font-bold"
            isPriority={true}
            priority={prioridadRA} />
          <div className="flex">
            <Ptext
              tag="F. Crea:"
              value={moment(fechaCrea).format('DD-MM-yyyy')}
              isTippy={true}
              textTippy="Fecha de creacion"
            />
            <Ptext
              tag={`(${days})`}
              isTippy={true}
              textTippy="Dias transcurridos"
            />
          </div>
          <div>

            <Menu
              direction="left"
              menuButton={
                <MenuButton className="focus:outline-none active:outline-none">
                  <i className="mx-2 fas fa-ellipsis-v"></i>
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

      <Modal size="regular" active={showModal} toggler={() => showModalFalse()}>
        <ModalHeader toggler={() => showModalFalse()}>
          {
            noteActive.idNote !== null ? 'Editar Nota' : 'Agregar nueva nota'
          }
        </ModalHeader>
        <ModalBody>
          {
            updateOrAdd ?
              (<div className="w-430">
                <label className="text-xs">Mensajes predeterminados:</label>
                <div className="py-3 pl-3 pr-1 mx-auto mt-1 mb-5 bg-gray-100 rounded-md">
                  <PDefaultNotes idAct={id} noteText="Inicializar actividad urgente" onclick={showModalFalse} updatePriority={true} />
                  <PDefaultNotes idAct={id} noteText="esperando respuesta de cliente" onclick={showModalFalse} />
                  <PDefaultNotes idAct={id} noteText="esperando actividad.." onclick={showModalFalse} />
                  <PDefaultNotes idAct={id} noteText="trabajando..." onclick={showModalFalse} />
                  <PDefaultNotes idAct={id} noteText="sin avance" onclick={showModalFalse} />
                  <PDefaultNotes idAct={id} noteText="en cola" onclick={showModalFalse} isSeparator={false} />
                </div>
                <Textarea
                  value={inputAdd}
                  name="inputAdd"
                  onChange={onChangeValues}
                  color="blue"
                  size="regular"
                  outline={true}
                  placeholder="Nota"
                />
              </div>) :
              (<div className="w-600">
                <label className="mb-2 text-xs">Notas:</label>
                <ul className="min-h-80 scroll-row">
                  {
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
                        return 'No hay notas...'
                      }
                    }).reverse()
                  }
                </ul>
                <br />
                <Textarea
                  value={inputEdit}
                  name="inputEdit"
                  onChange={onChangeValues}
                  color="blue"
                  size="regular"
                  outline={true}
                  placeholder="Nota"
                />
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

export default Card
