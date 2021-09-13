
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
import ButtonUnText from '../ui/buttons/ButtonUnText';
import ButtonColor from '../ui/buttons/ButtonColor';
import InputField from '../ui/inputs/InputField';
import PTimes from '../ui/text/PTimes';

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
  const [{ inputEdit, inputAdd }, onChangeValues, reset] = useForm(initialState)
  const [showModal, setShowModal] = useState(false)
  const [showModalDetails, setShowModalDetails] = useState(false)
  const [flagOpenDetails, setFlagOpenDetails] = useState(false)
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

  if (pausas.length >= 1 && estado === 2) {
    if (pausas[pausas.length - 1].boton === 2) {
      isActPlay = true
      actPlay = 'border-4 border-black border-opacity-25'
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
    alertTimer(state, 'info', 1500, 'No puedes agregar una nota vacia') && action();
    if (flagOpenDetails && inputAdd !== '') setShowModalDetails(true)
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
    if (flagOpenDetails && inputEdit !== '') setShowModalDetails(true)
  }

  const showModalUpdateNote = () => {
    setShowModalDetails(false)
    setShowModal(true)
    setUpdateOrAdd(false)
  }

  const showModalAddNote = () => {
    setShowModalDetails(false)
    setShowModal(true)
    setUpdateOrAdd(true)
  }

  const showModalFalse = () => {
    initialState.inputEdit = ''
    setNoteActive({ idNote: null, description: '' })
    setShowModal(false)
    flagOpenDetails ? setShowModalDetails(true) : setShowModalDetails(false)
    reset()
  }

  const showModalDetailsFalse = () => {
    setShowModalDetails(false)
    setFlagOpenDetails(false)
  }

  const handleGetIdNote = (idNote, description) => {
    reset()
    setNoteActive({ idNote, description })
    initialState.inputEdit = description
  }

  const handleOpenDetails = () => {
    setShowModalDetails(true)
    setFlagOpenDetails(true)
    console.log('modal detalles', id)
  }

  return (
    <>
      <div
        className={`rounded p-4 shadow-md text-sm ${bgColor} ${textColor} ${actPlay}`}
        onDoubleClick={() => handleOpenDetails()} >
        <div className="flex items-center justify-between pb-2 text-base">
          <Ptext tag="Actividad:" value={actividad} font="font-bold" />
          <div className="flex items-center">
            {isActPlay && (<i className="fas fa-user-clock"></i>)}
            <p className="ml-4 font-bold text-md">{numberCard}</p>
          </div>
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
                            onclick={handleGetIdNote}
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

      {/* modal activity details */}

      <Modal size="lg" active={showModalDetails} toggler={() => { }}>
        <ModalBody>
          <div className="flex items-center justify-between mb-5">
            <div className="text-2xl font-bold text-gray-700 capitalize">
              Detalle actividad: {id}, {actividad}
            </div>
            <div className="rounded-full p-1 bg-gray-100">
              <ButtonColor
                color="bg-gray-300"
                isUpdate={true}
                priority={1000}
                id={id}
                updatePriority={handleUpdatePriority}
                isTippy={true}
                tippyText="Sin Prioridad"
                offSet={10}
                hwBtn="5" />

              <ButtonColor
                color={ActState.userData.usuario.color_prioridad_baja}
                isUpdate={true}
                priority={600}
                id={id}
                updatePriority={handleUpdatePriority}
                isTippy={true}
                tippyText="Prioridad Baja"
                offSet={10}
                hwBtn="5" />

              <ButtonColor
                color={ActState.userData.usuario.color_prioridad_media}
                isUpdate={true}
                priority={400}
                id={id}
                updatePriority={handleUpdatePriority}
                isTippy={true}
                tippyText="Prioridad Media"
                offSet={10}
                hwBtn="5" />

              <ButtonColor
                color={ActState.userData.usuario.color_prioridad_alta}
                isUpdate={true}
                priority={100}
                id={id}
                updatePriority={handleUpdatePriority}
                isTippy={true}
                tippyText="Prioridad Alta"
                offSet={10}
                hwBtn="5" />
            </div>
          </div>
          <div className="w-screen"></div>
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <Ptext tag="Encargado:" value={encargado}
              />
              <Ptext tag="Proyecto:" value={proyecto}
              />
              <Ptext tag="Sub Proyecto:" value={subProyecto}
              />
              <Ptext tag="Solicitante:" value={solicitante}
              />
              <Ptext tag="Estado:" value={estado === 1 ? "Pendiente" : estado === 2 && "En trabajo"}
              />
              <Ptext tag="ID actividad:" value={id}
              />
              <Ptext tag="Ticket:" value={ticket === 0 ? 'Ninguno' : ticket} />
              <div className="flex">
                <Ptext tag="Fecha de Creacion:" value={moment(fechaCrea).format('DD-MM-yyyy')}
                />
                <Ptext tag={`(${days})`} isTippy={true} textTippy="Dias transcurridos"
                />
              </div>
              <div className="flex items-center">
                <Ptext tag="Prioridad:" value={actPriority} />
                <p className={`${bgColor} h-5 w-5 rounded-full ml-2`}></p>
              </div>
              <Ptext tag="Prioridad RA:" value={prioridadRA} />
            </div>
            <div className="col-span-2 bg-gray-100 py-2 px-4 rounded-md border">
              <div className="flex justify-between">
                <Ptext tag="Informes Diarios (notas):" />
                <div>
                  <ButtonUnText icon="fas fa-plus" onclick={showModalAddNote} />
                  <ButtonUnText icon="fas fa-pen" onclick={showModalUpdateNote} />
                </div>
              </div>
              <div className="scroll-row h-card-details">
                <ul className="mt-1">
                  {notas.length > 0 ?
                    notas.map(obj => {
                      return (
                        <ListNote
                          key={obj.id_nota}
                          desc={obj.desc_nota}
                          date={obj.fecha_hora_crea}
                          user={obj.user_crea}
                          dateColor={dateColor}
                          styleList="font-normal text-justify"
                        />
                      )
                    }).reverse()
                    :
                    <li>Sin notas</li>
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-6 bg-gray-100 rounded-md py-2 px-4 border">
            <div className="flex justify-between">
              <Ptext tag="Descripcion:" />
              <ButtonUnText
                icon="fas fa-pen"
                isTippy={true}
                tippyText="no disponible"
                isOnclickeable={false} />
            </div>
            <div className="max-h-48 scroll-row">
              <p className="p-2 leading-tight text-justify">{desc}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-6">
            <Ptext tag="Opciones Registro de Avance:" />
            <div className="mt-4 grid grid-cols-4 gap-10 px-5">
              <div className="col-span-1 border-r">
                <InputField disabled={false} tag="Nᵒ prioridad" value="150" />
                <InputField tag="tiempo estimado" value="2" />
                <InputField tag="tiempo trabajado" value="3" />
                <InputField tag="tiempo cotizado" value="2" />
              </div>
              <div className="col-span-3">
                <div>

                </div>
                <div className="grid grid-cols-4">
                  <PTimes user="RD" />
                  <PTimes user="SA" />
                  <PTimes user="IA" />
                  <PTimes user="FM" />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="lightBlue"
            buttonType="link"
            size="regular"
            rounded={true}
            block={false}
            iconOnly={false}
            onClick={() => showModalDetailsFalse()}
            ripple="dark">
            cerrar
          </Button>
        </ModalFooter>
      </Modal>

    </>
  )
}

export default Card
