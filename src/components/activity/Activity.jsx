
import React, { useContext, useEffect, useState } from 'react'
import { UiContext } from '../../context/UiContext'
import { ActivityContext } from '../../context/ActivityContext'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { useForm } from '../../hooks/useForm'
import Tippy from '@tippyjs/react'
import ListNote from '../ui/list/ListNote'
import Modal from '../ui/modal/Modal'
import Button from '../ui/buttons/Button'
import TextArea from '../ui/inputs/TextArea'
import moment from 'moment'
import { alertTimer, normalAlert } from '../../helpers/alerts'
import { checkForms, seekParam } from '../../helpers/auxFunctions'
import TextContent from '../ui/text/TextContent'

let initialState = { inputEdit: '', inputAdd: '' }
let today = moment(new Date()).format('yyyy-MM-DD')
const defaultNotes = [
  { id: 11121, desc: "Inicializar actividad urgente" },
  { id: 11122, desc: "esperando respuesta de cliente" },
  { id: 11123, desc: "esperando actividad.." },
  { id: 11124, desc: "trabajando..." },
  { id: 11125, desc: "sin avance" },
  { id: 11126, desc: "en cola" }
]

function Activity(props) {
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
  let textColor, lineColor, bgColor, actPriority, actPlay = '', isActPlay = false, actPlayList = 'border'

  switch (prioridad) {
    case 600:
      bgColor = ActState.userData.usuario.color_prioridad_baja
      textColor = 'text-white'
      lineColor = 'border-white'
      actPriority = 'Baja'
      break;
    case 400:
      bgColor = ActState.userData.usuario.color_prioridad_media
      textColor = 'text-white'
      lineColor = 'border-white'
      actPriority = 'Media'
      break;
    case 100:
      bgColor = ActState.userData.usuario.color_prioridad_alta
      textColor = 'text-white'
      lineColor = 'border-white'
      actPriority = 'Alta'
      break;
    default:
      bgColor = 'bg-white hover:bg-gray-50'
      textColor = 'text-gray-600'
      lineColor = 'border-gray-500'
      actPriority = 'S/P'
      break;
  }

  if (pausas.length > 0 && estado === 2) {
    if (pausas[pausas.length - 1].boton === 2) {
      isActPlay = true
      actPlay = 'border-4 border-black border-opacity-25'
      actPlayList = 'border-3 border-black border-opacity-25'
    }
    else {
      isActPlay = false
      actPlay = ''
      actPlayList = 'border'
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
                <TextContent bold tag="Encargado" value={encargado} />
                <TextContent bold tag="Proyecto" value={proyecto} />
                <TextContent bold tag="Sub proyecto" value={subProyecto} />
                <TextContent bold tag="Solicitante" value={solicitante} />
                <TextContent bold tag="Estado" value={estado === 1 ? "Pendiente" : estado === 2 && "En trabajo"} />
              </div>
              <div>
                <TextContent bold tag="ID" value={id} />
                <TextContent bold tag="Ticket" value={ticket === 0 ? 'S/T' : ticket} />
                <TextContent bold tag="Fecha" value={moment(fechaCrea).format('DD - MM - YY')} />
                <TextContent bold tag="Transcurridos" value={`${days} Dias`} />
                <TextContent bold tag="Prioridad" value={`${actPriority} (${prioridadRA})`} />
              </div>
            </div>
            <div className={`mb-2 bg-black rounded-md p-1 ${prioridad === 1000 ? 'bg-opacity-5' : 'bg-opacity-10'}`}>
              <p className="text-opacity-75 font-bold ">Descripcion</p>
              <p className="max-h-32 overflow-custom whitespace-pre-wrap">{seekParam(desc, '- PAUSA')}</p>
            </div>
            <div>
              <p className={`text-opacity-75 font-bold my-4 pb-1 ${notas.length > 0 && 'border-b'} ${lineColor}`}>Notas</p>
              <ul className="mt-1 font-normal max-h-32 overflow-custom mix-blend-luminosity">
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
              <Button
                type="icon"
                icon={isActPlay ? 'fas fa-pause fa-sm' : 'fas fa-play fa-sm'}
                className={` ml-3 ${isActPlay ? 'hover:text-red-500' : 'hover:text-green-500'}`}
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
          className={`grid grid-cols-12 my-2 shadow-md rounded-md min-w-table border-transparent hover:border-gray-700 transition duration-500 ${bgColor} ${textColor} ${actPlayList}`}
          onDoubleClick={handleOpenDetails}
        >
          <div className="py-3 px-2 col-span-1 font-semibold text-base">{id}</div>
          <div className="py-3 px-2 col-span-1">{ticket === 0 ? '--' : ticket}</div>
          <div className="py-3 px-2 col-span-1 font-semibold text-base">{proyecto}</div>
          <div className="py-3 px-2 col-span-1">{subProyecto === '' ? '--' : subProyecto}</div>
          <div className="py-2 px-2 col-span-1 font-semibold">
            {solicitante}
            <span className="block text-xs font-normal">({moment(fechaCrea).format('DD - MM - yyyy')})</span>
          </div>
          <div className="py-3 px-2 col-span-1 font-semibold text-base">{encargado}</div>
          <div className="py-3 px-2 col-span-1 font-semibold text-left">
            <Tippy
              disabled={isExpand}
              offset={[0, 6]}
              placement="bottom"
              delay={[700, 0]}
              content={<span>{actividad}</span>}
            >
              <p className={!isExpand ? 'truncate' : ''}>{actividad}</p>
            </Tippy>
          </div>
          <div className="py-3 px-2 col-span-3 text-justify flex items-start justify-between">
            <Tippy
              disabled={isExpand}
              offset={[0, 6]}
              placement="bottom"
              delay={[700, 0]}
              content={<span>{desc}</span>}
            >
              <p className={!isExpand ? 'truncate' : 'whitespace-pre-wrap'}>{seekParam(desc, '- PAUSA')}</p>
            </Tippy>
            <Button
              className="ml-2"
              type="icon"
              icon={isExpand ? 'fas fa-angle-up' : 'fas fa-angle-down'}
              onClick={handleExpand} />
          </div>
          <div className="py-3 px-2 col-span-1 font-semibold text-base">
            <Tippy
              disabled={!isActPlay}
              offset={[0, 8]}
              placement="bottom"
              delay={[700, 0]}
              content={<span>Actividad en play</span>}
            >
              <p className={isActPlay ? 'bg-black bg-opacity-10 rounded-full w-max mx-auto px-2' : ''}>{estado === 1 ? "Pendiente" : estado === 2 && "En trabajo"}</p>
            </Tippy>
          </div>
          <div className="py-3 px-2 col-span-1 flex items-center mx-auto">
            <Button
              className={isActPlay ? 'hover:text-red-500 h-7 w-7' : 'hover:text-green-500 h-7 w-7'}
              type="icon"
              icon={isActPlay ? 'fas fa-pause fa-sm' : 'fas fa-play fa-sm'}
              tippyText={isActPlay ? 'Detener tiempo' : 'Reanudar tiempo'} />
            <Menu
              direction="left"
              menuButton={
                <MenuButton className="focus:outline-none active:outline-none h-7 w-7 rounded-full transition duration-500 hover:bg-black hover:bg-opacity-25 ml-5">
                  <i className="fas fa-bars"></i>
                </MenuButton>
              }
            >
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

      <Modal showModal={showModal} onClose={showModalFalse} className="max-w-3xl">
        <h1 className="text-xl font-semibold mb-5">{noteActive.idNote !== null ? 'Editar Nota' : 'Agregar nueva nota'}</h1>
        <div className="w-full">
          {
            updateOrAdd ?
              <>
                <label className="text-xs">Mensajes predeterminados:</label>
                <div className="py-3 pl-3 pr-1 mx-auto mt-1 mb-5 bg-gray-100 rounded-md">
                  {
                    defaultNotes.map((note, index) => (
                      <ListNote
                        key={note.id}
                        type="listAction"
                        idActivity={id}
                        desc={note.desc}
                        updatePriority={note.id === 11121}
                        callBack={showModalFalse}
                        separator={defaultNotes.length !== index + 1} />
                    ))
                  }
                </div>
                <TextArea
                  field="Descripcion nota"
                  value={inputAdd}
                  name="inputAdd"
                  onChange={onChangeValues} />
              </> :
              <>
                <label className="mb-2">Notas:</label>
                <ul className="max-h-44 overflow-custom bg-gray-100 rounded-md py-3 pl-3">
                  {
                    notas.length > 0 ?
                      notas.map((obj, index) => {
                        if (id === obj.id_det) {
                          return (
                            <ListNote
                              type='modal'
                              key={obj.id_nota}
                              idNote={obj.id_nota}
                              desc={obj.desc_nota}
                              date={obj.fecha_hora_crea}
                              user={obj.user_crea}
                              onclick={handleGetidNote}
                              activeColor={noteActive.idNote === obj.id_nota ? 'text-green-500' : 'text-gray-500'}
                              separator={notas.length !== index + 1}
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
            onClick={updateOrAdd ? () => handleAddNewNote() : () => handleUpdateNote()}
          />
        </div>
      </Modal>
    </>
  )
}

export default Activity
