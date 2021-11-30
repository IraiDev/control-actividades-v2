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
import { checkForms, seekParam } from '../../helpers/auxFunctions'
import TextContent from '../ui/text/TextContent'
import { Alert } from '../../helpers/alert'

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

  const isPending = estado === 1
  const pause = pausas.length > 0 && pausas[pausas.length - 1].boton === 2
  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)
  const { functions: UiFunc } = useContext(UiContext)
  const [{ inputEdit, inputAdd }, onChangeValues, reset] = useForm(initialState)
  const [showModal, setShowModal] = useState(false)
  const [updateOrAdd, setUpdateOrAdd] = useState(false)
  const [{ idNote }, setNoteActive] = useState({ idNote: null, description: '' })
  const [isExpand, setIsExpand] = useState(false)

  let dateTo = moment(fechaCrea)
  let days = dateTo.diff(today, 'days') - (dateTo.diff(today, 'days') * 2)
  let color, line, background, priority, border = '', border_list = 'border'

  switch (prioridad) {
    case 600:
      background = ActState.userData.usuario.color_prioridad_baja
      color = 'text-white'
      line = 'border-white'
      priority = 'Baja'
      break;
    case 400:
      background = ActState.userData.usuario.color_prioridad_media
      color = 'text-white'
      line = 'border-white'
      priority = 'Media'
      break;
    case 100:
      background = ActState.userData.usuario.color_prioridad_alta
      color = 'text-white'
      line = 'border-white'
      priority = 'Alta'
      break;
    default:
      background = 'bg-white hover:bg-gray-50'
      color = 'text-gray-600'
      line = 'border-gray-500'
      priority = 'S/P'
      break;
  }

  if (pause) {
    border = 'border-4 border-black border-opacity-25'
    border_list = 'border-3 border-black border-opacity-25'
  }
  else {
    border = ''
    border_list = 'border'
  }

  const handleAddNewNote = () => {
    const vDesc = checkForms(inputAdd)
    const { state, char, list } = vDesc
    if (state) {
      Alert({
        icon: 'warn',
        title: 'Atencion',
        content: `Caracter <b class="text-gray-600 text-xl">${char}</b>
        no pemitido, campo: <b>Descripcion Nota</b>
        <p class="mt-5">Caracteres no permitidos:</p> <b>${list}</b>`,
        showCancelButton: false,
        timer: 5000
      })
      return
    }

    if (inputAdd === '') {
      Alert({
        icon: 'warn',
        title: 'Atencion',
        content: 'No se puede crear una nota vacia',
        showCancelButton: false,
        timer: 5000
      })
      return
    }
    const data = { id_actividad: id, description: inputAdd }
    ActFunc.addNewNote({ data })
    showModalFalse()
  }

  const handleUpdateNote = () => {
    const vDesc = checkForms(inputEdit)
    const { state, char, list } = vDesc
    if (state) {
      Alert({
        icon: 'warn',
        title: 'Atencion',
        content: `Caracter <b class="text-gray-600 text-xl">${char}</b>
        no pemitido, campo: <b>Descripcion Nota</b>
        <p class="mt-5">Caracteres no permitidos:</p> <b>${list}</b>`,
        showCancelButton: false,
        timer: 5000
      })
      return
    }

    const dataUpdate = { id_nota: idNote, description: inputEdit }
    const update = () => {
      ActFunc.updateNote({ data: dataUpdate })
      showModalFalse()
    }
    const dataAdd = { id_actividad: id, description: inputEdit }
    const add = () => {
      ActFunc.addNewNote({ data: dataAdd })
      showModalFalse()
    }
    if (inputEdit === '') {
      Alert({
        icon: 'warn',
        title: 'Atencion',
        content: 'No se puede crear/modificar una nota como vacia',
        showCancelButton: false,
        timer: 5000
      })
      return
    }
    if (idNote !== null) update()
    else add()
  }

  const showModalAddOrUpdate = ({ state }) => {
    setShowModal(true)
    setUpdateOrAdd(state)
  }

  const showModalFalse = () => {
    initialState.inputEdit = ''
    setNoteActive({ idNote: null, description: '' })
    setShowModal(false)
    reset()
  }

  const handleGetIdNote = (idNote, description) => {
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

  const handlePlayActivity = async () => {
    if (pause) { // se pusara
      const content =
        `
          <p class="text-sm">Se pausara la actividad: <b>${id}</b>, <b>${actividad}</b></p>
          <p class="text-sm">Ingrese el detalle de la detencion <b>(obligatorio):</b></p>
        `
      const resp = await Alert({
        content,
        title: 'Atencion',
        type: 'input',
        input: 'textarea',
        confirmText: 'Guardar pausa'
      })
      const { ok, text } = resp

      if (ok) {
        UiFunc.setIsLoading(true)
        const data = {
          mensaje: text,
          id_actividad: id
        }
        ActFunc.playActivity(data, false)
      }
    }
    else { // se pondra play
      UiFunc.setIsLoading(true)
      ActFunc.playActivity({ id_actividad: id }, false)
    }
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
          className={`grid grid-cols-1 p-3 bg-white rounded-md shadow-xl text-xs font-semibold transition duration-500 border-2 border-transparent hover:border-gray-600 ${background} ${color} ${border}`}
          onDoubleClick={handleOpenDetails}>
          <div>
            <h5 className="font-bold text-base mb-2">{numberCard} - <p className="inline capitalize">{actividad}</p></h5>
            <div className="grid grid-cols-2 mb-2">
              <div>
                <TextContent bold tag="Encargado" value={encargado} />
                <TextContent bold tag="Proyecto" value={proyecto} />
                <TextContent bold tag="Sub proyecto" value={subProyecto} />
                <TextContent bold tag="Solicitante" value={solicitante} />
                <TextContent bold tag="Estado" value={isPending ? "Pendiente" : "En trabajo"} />
              </div>
              <div>
                <TextContent bold tag="ID" value={id} />
                <TextContent bold tag="Ticket" value={ticket === 0 ? 'S/T' : ticket} />
                <TextContent bold tag="Fecha" value={moment(fechaCrea).format('DD - MM - YY')} />
                <TextContent bold tag="Transcurridos" value={`${days} Dias`} />
                <TextContent bold tag="Prioridad" value={`${priority} (${prioridadRA})`} />
              </div>
            </div>
            <div className={`mb-2 bg-black rounded-md p-1 ${prioridad === 1000 ? 'bg-opacity-5' : 'bg-opacity-10'}`}>
              <p className="text-opacity-75 font-bold ">Descripcion</p>
              <p className="max-h-32 overflow-custom mix-blend-luminosity whitespace-pre-wrap">{seekParam(desc, '- PAUSA')}</p>
            </div>
            <div>
              <p className={`text-opacity-75 font-bold my-4 pb-1 ${notas.length > 0 && 'border-b'} ${line}`}>Notas</p>
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
                            from={false}
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
          <div className={`flex justify-between items-center place-self-end w-full border-t mt-2 ${line}`}>
            <div className="flex items-center justify-between pt-1">
              <Menu
                className={`${background} ${color}`}
                direction="bottom"
                menuButton={
                  <MenuButton
                    disabled={!isPending}
                    className="focus:outline-none active:outline-none py-1 px-3 rounded-full font-bold transition duration-500 hover:bg-black hover:bg-opacity-10">
                    {isPending ? 'Pendiente' : 'En Trabajo'} <i className="fas fa-chevron-down ml-2"></i>
                  </MenuButton>
                }
              >
                <MenuItem
                  className="text-left hover:text-white hover:bg-blue-500 font-bold"
                >
                  Pendiente
                </MenuItem>
                <MenuItem
                  className="text-left hover:text-white hover:bg-blue-500 font-bold"
                >
                  En Trabajo
                </MenuItem>
              </Menu>
              {!isPending &&
                <>
                  <i className={`ml-2 fas fa-user-clock fa-sm ${!pause && 'hidden'}`}></i>
                  <Button
                    type="icon"
                    icon={pause ? 'fas fa-pause fa-sm' : 'fas fa-play fa-sm'}
                    className="rounded-md hover:bg-opacity-10 hover:bg-black"
                    onClick={handlePlayActivity} />
                </>
              }
              {/* <select className={`${background} transition duration-500 rounded-md p-1 focus:outline-none font-bold lowercase`} name="" id="">
                {
                  ActState.arrayState.map(est => {
                    if (est.label !== 'Todas') {
                      return (
                        <option selected={estado === est.value} key={est.value} value={est.value}>
                          {est.label}
                        </option>
                      )
                    } else return null
                  })
                }
              </select> */}
            </div>
            <div className="font-normal">
              <Menu
                className={`${background} transition duration-500 ${color}`}
                direction="left"
                menuButton={
                  <MenuButton className="focus:outline-none active:outline-none h-7 w-7 rounded-md transition duration-500 hover:bg-black hover:bg-opacity-10 mt-1">
                    <i className="fas fa-ellipsis-v"></i>
                  </MenuButton>
                }
              >
                <MenuItem
                  className="text-left hover:text-white hover:bg-blue-500"
                  onClick={() => showModalAddOrUpdate({ state: true })} >
                  Agregar Nota
                </MenuItem>
                <MenuItem
                  className="text-left hover:text-white hover:bg-blue-500"
                  onClick={() => showModalAddOrUpdate({ state: false })} >
                  Agregar/Editar Nota
                </MenuItem>
                <MenuItem
                  className="flex justify-between hover:text-white hover:bg-blue-500"
                  onClick={() => ActFunc.updatePriority({ prioridad_numero: 100, id_actividad: id })} >
                  <p className="font-medium">Prioridad Alta</p>
                  <p
                    className={`p-2 ml-3 ${ActState.userData.usuario.color_prioridad_alta} rounded-full focus:outline-none active:outline-none`}
                  ></p>
                </MenuItem>
                <MenuItem
                  className="flex justify-between hover:text-white hover:bg-blue-500"
                  onClick={() => ActFunc.updatePriority({ prioridad_numero: 400, id_actividad: id })} >
                  <p className="font-medium">Prioridad Media</p>
                  <p
                    className={`p-2 ml-3 ${ActState.userData.usuario.color_prioridad_media} rounded-full focus:outline-none active:outline-none`}
                  ></p>
                </MenuItem>
                <MenuItem
                  className="flex justify-between hover:text-white hover:bg-blue-500"
                  onClick={() => ActFunc.updatePriority({ prioridad_numero: 600, id_actividad: id })} >
                  <p className="font-medium">Prioridad Baja</p>
                  <p
                    className={`p-2 ml-3 ${ActState.userData.usuario.color_prioridad_baja} rounded-full focus:outline-none active:outline-none`}
                  ></p>
                </MenuItem>
                <MenuItem
                  className="flex justify-between hover:text-white hover:bg-blue-500"
                  onClick={() => ActFunc.updatePriority({ prioridad_numero: 1000, id_actividad: id })} >
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
          className={`grid grid-cols-12 my-2 shadow-md rounded-md min-w-table border-transparent hover:border-gray-700 transition duration-500 ${background} ${color} ${border_list}`}
          onDoubleClick={handleOpenDetails}
        >
          <div className="py-3 px-2 col-span-1 font-semibold text-base">{id} | {prioridadRA}</div>
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
              onClick={() => setIsExpand(!isExpand)} />
          </div>
          <div className="py-2.5 mx-auto col-span-1 font-semibold text-base">
            <Menu
              className={`${background} transition duration-500 ${color}`}
              direction="bottom"
              menuButton={
                <MenuButton
                  disabled={!isPending}
                  className={`
                  text-sm focus:outline-none active:outline-none 
                  py-1 px-3 rounded-full font-bold transition duration-500 
                  hover:bg-black hover:bg-opacity-10
                  border-2 border-transparent
                  ${pause ? prioridad !== 1000 ? 'border-white' : 'border-gray-400' : ''}
                  `}
                >
                  {isPending ? 'Pendiente' : 'En Trabajo'} <i className="fas fa-chevron-down fa-sm"></i>
                </MenuButton>
              }
            >
              <MenuItem
                className="text-left text-sm hover:text-white hover:bg-blue-500 font-semibold"
              >
                Pendiente
              </MenuItem>
              <MenuItem
                className="text-left text-sm hover:text-white hover:bg-blue-500 font-semibold"
              >
                En Trabajo
              </MenuItem>
            </Menu>
          </div>
          <div className="col-span-1 py-2.5">
            <div className="flex items-center justify-center">
              {!isPending &&
                <Button
                  className="hover:bg-black hover:bg-opacity-10 rounded-md"
                  type="icon"
                  icon={pause ? 'fas fa-pause fa-sm' : 'fas fa-play fa-sm'}
                  onClick={handlePlayActivity} />
              }
              <Menu
                direction="left"
                menuButton={
                  <MenuButton className="focus:outline-none active:outline-none h-7 w-7 rounded-md transition duration-500 hover:bg-black hover:bg-opacity-10">
                    <i className="fas fa-bars"></i>
                  </MenuButton>
                }
              >
                <MenuItem
                  className="flex justify-between"
                  onClick={() => {
                    ActFunc.updatePriority({ prioridad_numero: 100, id_actividad: id })
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
                    ActFunc.updatePriority({ prioridad_numero: 400, id_actividad: id })
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
                    ActFunc.updatePriority({ prioridad_numero: 600, id_actividad: id })
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
                    ActFunc.updatePriority({ prioridad_numero: 1000, id_actividad: id })
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

      {/* modal update todo */}

      <Modal showModal={showModal} onClose={showModalFalse} className="max-w-3xl">
        <h1 className="text-xl font-semibold mb-5">{idNote !== null ? 'Editar Nota' : 'Agregar nueva nota'}</h1>
        <div className="w-full">
          {
            updateOrAdd ?
              <>
                <label className="text-xs">Mensajes predeterminados:</label>
                <div className="py-3 pl-3 pr-1 mx-auto overflow-custom h-44 mt-1 mb-5 bg-gray-100 rounded-md">
                  {
                    defaultNotes.map((note, index) => (
                      <ListNote
                        key={note.id}
                        type="listAction"
                        idActivity={id}
                        desc={note.desc}
                        isDetail={false}
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
                              onclick={handleGetIdNote}
                              activeColor={idNote === obj.id_nota ? 'text-green-500' : 'text-gray-500'}
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
            name={idNote !== null ? (updateOrAdd ? 'Agregar' : 'Editar') : 'Agregar'}
            onClick={updateOrAdd ? () => handleAddNewNote() : () => handleUpdateNote()}
          />
        </div>
      </Modal>
    </>
  )
}

export default Activity
