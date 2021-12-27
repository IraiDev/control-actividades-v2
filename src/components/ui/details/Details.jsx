import React, { useContext, useEffect, useState } from 'react'
import { UiContext } from '../../../context/UiContext'
import { ActivityContext } from '../../../context/ActivityContext'
import TextContent from '../text/TextContent'
import ListNote from '../list/ListNote'
import Input from '../inputs/Input'
import Button from '../buttons/Button'
import Select from 'react-select';
import ButtonColor from '../buttons/ButtonColor'
import Modal from '../modal/Modal'
import TextArea from '../inputs/TextArea'
import TableTimes from '../times/TableTimes'
import ListDocs from '../list/ListDocs'
import Tippy from '@tippyjs/react'
import { useForm } from '../../../hooks/useForm'
import { checkForms, seekParam } from '../../../helpers/auxFunctions'
import moment from 'moment'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { Alert } from '../../../helpers/alert'

let today = moment(new Date()).format('yyyy-MM-DD')

const defaultNotes = [
  { id: 11121, desc: "Inicializar actividad urgente" },
  { id: 11122, desc: "esperando respuesta de cliente" },
  { id: 11123, desc: "esperando actividad.." },
  { id: 11124, desc: "trabajando..." },
  { id: 11125, desc: "sin avance" },
  { id: 11126, desc: "en cola" }
]

function Form({ data }) {

  const {
    actividad,
    encargado_actividad,
    estado,
    fecha_hora_mod,
    fecha_tx,
    func_objeto,
    hora_tx,
    id_det,
    id_proy,
    id_revisor,
    b_proyecto,
    id_todo_task,
    notas,
    num_ticket_edit,
    pausas,
    prioridad_etiqueta,
    proyectoIdProy,
    proyectoTareaIdProy,
    proyecto_tarea,
    id_sub_proyecto,
    subproyectoIdSubProyecto,
    subproyectosTareasIdSubProyecto,
    subproyectos_tareas,
    tarea_documentos,
    tarea_revisor,
    tiempo_cliente,
    tiempo_estimado,
    tiempo_hoy,
    tiempo_trabajado,
    tiempo_zionit,
    user_solicita,
    num_prioridad,
    glosa_explicativa

  } = data

  const initialState = {
    inputEdit: '',
    inputAdd: '',
    desc: func_objeto,
    ticket: num_ticket_edit,
    priority: num_prioridad,
    time: tiempo_estimado,
    title: actividad,
    gloss: glosa_explicativa
  }

  const pause = pausas.length > 0 && pausas[pausas.length - 1].boton === 2
  const isPending = estado === 1
  let randomString = Math.random().toString(36)
  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)
  const { functions: UiFunc } = useContext(UiContext)
  const [{ inputEdit, inputAdd, desc, priority, ticket, time, title, gloss }, onChangeValues, reset] = useForm(initialState)
  const [{ idNote }, setNoteActive] = useState({ idNote: null })
  // modals
  const [updateOrAdd, setUpdateOrAdd] = useState(false)
  const [gloseOrDesc, setGloseOrDesc] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showDescModal, setShowDescModal] = useState(false)
  const [showCloneModal, setShowCloneModal] = useState(false)
  // modals
  // selects
  const [project, setProject] = useState(null)
  const [subProject, setSubProject] = useState(null)
  const [userR, setUserR] = useState(null)
  const [userS, setUserS] = useState(null)
  const [userE, setUserE] = useState(null)
  const [file, setFile] = useState(null)
  const [arrSubProject, setArrSubProject] = useState([])
  // selects
  const [resetFile, setResetFile] = useState(randomString)

  const handleBack = async () => {
    await UiFunc.setIsLoading(true)
    await ActFunc.getActivities()
    await UiFunc.activityView()
    setResetFile(randomString)
    setFile(null)
  }

  const handleAddNewNote = () => {
    const vDesc = checkForms(inputAdd)
    const { state, char, list } = vDesc
    if (state) {
      Alert({
        icon: 'warn',
        title: 'Atencion',
        content: `Caracter <b class="text-gray-600 text-xl">${char}</b>
                  no pemitido, campo: <b>Nota</b>
                  <p class="mt-5">Caracteres no permitidos:</p> <b>${list}</b>`,
        timer: 5000,
        showCancelButton: false
      })
      return
    }

    if (inputAdd === '') {
      Alert({
        icon: 'warn',
        title: 'Atencion',
        content: 'No puedes crear una nota vacia',
        timer: 5000,
        showCancelButton: false
      })
      return
    }
    const data = { id_actividad: id_det, description: inputAdd }
    ActFunc.addNewNote({ data, from: true, idActivity: id_det })
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
                  no pemitido, campo: <b>Nota</b>
                  <p class="mt-5">Caracteres no permitidos:</p> <b>${list}</b>`,
        timer: 5000,
        showCancelButton: false
      })
      return
    }

    if (idNote !== null) {
      if (inputEdit === '') {
        Alert({
          icon: 'warn',
          title: 'Atencion',
          content: 'No puedes actualizar la nota si el campo esta vacio',
          timer: 5000,
          showCancelButton: false
        })
        return
      }
      const data = { id_nota: idNote, description: inputEdit }
      ActFunc.updateNote({ data, from: true, idActivity: id_det })
      showModalFalse()
    } else {
      if (inputEdit === '') {
        Alert({
          icon: 'warn',
          title: 'Atencion',
          content: 'No puedes crear una nota vacia',
          timer: 5000,
          showCancelButton: false
        })
        return
      }
      const data = { id_actividad: id_det, description: inputEdit }
      ActFunc.addNewNote({ data, from: true, idActivity: id_det })
      showModalFalse()
    }
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

  const onCloseDescModal = () => {
    setShowDescModal(false)
    reset()
  }

  const handleGetIdNote = (idNote, description) => {
    reset()
    setNoteActive({ idNote, description })
    initialState.inputEdit = description
  }

  const handleDeleteActivity = () => {
    console.log('se elimino fake')
  }

  const onChangeFile = (event) => {
    if (event.target.files[0].size > 5242881) {
      setFile(null)
      setResetFile(randomString)
      Alert({
        icon: 'warn',
        title: 'Atencion',
        content: 'El archivo excede el peso permitido por el sistema, peso maximo <b>5MB</b>',
        timer: 5000,
        showCancelButton: false
      })
      return
    }
    setFile(event.target.files[0])
  }

  const handleClone = () => {
    setShowCloneModal(false)
  }

  const handlePlayActivity = async () => {
    if (pause) { // se pusara
      const content =
        `
          Se pausara la actividad: <b>${id_det}</b>, <b>${actividad}</b>
          <p>Ingrese el detalle de la detencion <b>(obligatorio):</b></p>
        `
      const resp = await Alert({
        content,
        title: 'Pausar actividad',
        type: 'input',
        input: 'textarea',
        confirmText: 'Guardar pausa'
      })
      const { ok, text } = resp

      if (ok) {
        UiFunc.setIsLoading(true)

        const data = {
          mensaje: text,
          id_actividad: id_det
        }
        ActFunc.playActivity(data)
      }
    }
    else { // se pondra play
      UiFunc.setIsLoading(true)
      ActFunc.playActivity({ id_actividad: id_det })
    }
  }

  const handleSaveChanges = () => {

    const formData = new FormData()
    formData.append('proyecto', project.value)
    subProject && formData.append('sub_proyecto', subProject.value)
    formData.append('solicita', userS.value)
    formData.append('encargado', userE.value)
    formData.append('revisor', userR.value)
    formData.append('prioridad', priority)
    formData.append('ticket', ticket)
    formData.append('tiempo_estimado', time)
    formData.append('titulo', title)
    formData.append('descripcion', desc)
    formData.append('glosa', gloss)
    formData.append('id_actividad', id_det)
    // formData.append('archivos', file) 

    ActFunc.saveActivityChanges(formData)
  }

  useEffect(() => {
    if (project !== null) {
      setArrSubProject(ActState.arraySubProject.filter(item => item.id === project.value))
      const temp = ActState.arraySubProject.find(item => item.value === id_sub_proyecto)
      if (temp !== undefined) setSubProject(temp)
    }
  }, [project])

  useEffect(() => {
    setProject(ActState.arrayProject.find(item => id_proy === item.value))
    setUserS(ActState.arrayUsersS.find(item => user_solicita === item.value))
    setUserE(ActState.arrayUsersE.find(item => encargado_actividad === item.value))
    setUserR(ActState.arrayUsersE.find(item => tarea_revisor !== null && tarea_revisor.abrev_user === item.value))
  }, [])

  return (
    <>
      {
        ActState.activityDetails !== null &&
        <>
          <div className="md:container mx-1 sm:mx-3 md:mx-auto text-gray-700">
            <div className="bg-white p-3 sm:p-6 md:p-8 rounded-lg shadow-lg my-10">
              {/* titulo */}
              <div className="md:flex justify-between items-center mb-10">
                <div className="text-lg md:text-xl font-bold text-gray-700 capitalize mt-2">
                  <Button
                    className="md:mr-2 hover:text-blue-500 pr-2"
                    type="icon"
                    icon="fas fa-chevron-left"
                    onClick={handleBack} />
                  Detalle actividad: {id_det}, {actividad}
                </div>
                <div className="rounded-full p-1 bg-gray-100 mt-4 lg:mt-0 w-max">
                  <ButtonColor
                    color="bg-gray-300"
                    isUpdate={true}
                    priority={1000}
                    id={id_det}
                    updatePriority={
                      (id, priority) => ActFunc.updatePriority({ prioridad_numero: priority, id_actividad: id }, true, id)
                    }
                    isTippy={true}
                    tippyText="Sin Prioridad"
                    offSet={10}
                    hwBtn="5" />

                  <ButtonColor
                    color={ActState.userData.usuario.color_prioridad_baja}
                    isUpdate={true}
                    priority={600}
                    id={id_det}
                    updatePriority={
                      (id, priority) => ActFunc.updatePriority({ prioridad_numero: priority, id_actividad: id }, true, id)
                    }
                    isTippy={true}
                    tippyText="Prioridad Baja"
                    offSet={10}
                    hwBtn="5" />

                  <ButtonColor
                    color={ActState.userData.usuario.color_prioridad_media}
                    isUpdate={true}
                    priority={400}
                    id={id_det}
                    updatePriority={
                      (id, priority) => ActFunc.updatePriority({ prioridad_numero: priority, id_actividad: id }, true, id)
                    }
                    isTippy={true}
                    tippyText="Prioridad Media"
                    offSet={10}
                    hwBtn="5" />

                  <ButtonColor
                    color={ActState.userData.usuario.color_prioridad_alta}
                    isUpdate={true}
                    priority={100}
                    id={id_det}
                    updatePriority={
                      (id, priority) => ActFunc.updatePriority({ prioridad_numero: priority, id_actividad: id }, true, id)
                    }
                    isTippy={true}
                    tippyText="Prioridad Alta"
                    offSet={10}
                    hwBtn="5" />
                </div>
              </div>
              {/* notas y lista de propiedas de actividad */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                <div className="col-span-1 px-4 sm:p-0">
                  <TextContent bold tag="Encargado" value={encargado_actividad}
                  />
                  <TextContent bold tag="Proyecto" value={proyecto_tarea.proyecto}
                  />
                  <TextContent bold tag="Sub Proyecto" value={subproyectos_tareas !== null ? subproyectos_tareas.nombre_sub_proy !== '' ? subproyectos_tareas.nombre_sub_proy : 'Ninguno' : 'Ninguno'}
                  />
                  <TextContent bold tag="Solicitante" value={user_solicita}
                  />
                  <TextContent bold tag="Estado" value={isPending ? "Pendiente" : "En trabajo"}
                  />
                  <TextContent bold tag="ID actividad" value={id_det}
                  />
                  <TextContent bold tag="Ticket" value={num_ticket_edit === 0 ? 'Ninguno' : num_ticket_edit} />
                  <TextContent bold tag="Fecha de Creacion" value={moment(fecha_tx).format('DD-MM-yyyy')}
                  />
                  <TextContent bold tag="Transcurridos" value={`${moment(fecha_tx).diff(today, 'days') - (moment(fecha_tx).diff(today, 'days') * 2)} Dias`}
                  />
                  <div className="flex items-center">
                    <TextContent
                      bold tag="Prioridad"
                      value={prioridad_etiqueta === 1000 ? 'S/P' : prioridad_etiqueta === 600 ? 'Baja' : prioridad_etiqueta === 400 ? 'Media' : prioridad_etiqueta === 100 && 'Alta'} />
                    <p className={`
                    ${prioridad_etiqueta === 1000 ? 'bg-gray-200' : prioridad_etiqueta === 600 ? ActState.userData.usuario.color_prioridad_baja : prioridad_etiqueta === 400 ? ActState.userData.usuario.color_prioridad_media : prioridad_etiqueta === 100 && ActState.userData.usuario.color_prioridad_alta} 
                    h-5 w-5 rounded-full ml-2`
                    }></p>
                  </div>
                  <TextContent bold tag="Prioridad RA" value={ActState.activityDetails.num_prioridad} />
                </div>
                <section className='col-span-2'>
                  <Input
                    className='mb-2'
                    field='titulo'
                    name='title'
                    value={title}
                    onChange={onChangeValues}
                  />
                  <div className="bg-gray-100 py-2 px-4 rounded-md mt-4 md:mt-0">
                    <div className="flex justify-between">
                      <TextContent tag="Informes Diarios (notas)" />
                      <div>
                        <Button
                          className="h-8 w-8 rounded-full hover:bg-gray-300"
                          type="icon"
                          icon="fas fa-plus"
                          onClick={() => showModalAddOrUpdate({ state: true })} />
                        <Button
                          className="h-8 w-8 rounded-full hover:bg-gray-300"
                          type="icon"
                          icon="fas fa-pen"
                          onClick={() => showModalAddOrUpdate({ state: false })} />
                      </div>
                    </div>
                    <div className="h-44 overflow-custom">
                      <ul className="mt-1 text-sm">
                        {notas.length > 0 ?
                          notas.map(obj => {
                            return (
                              <ListNote
                                key={obj.id_nota}
                                desc={obj.desc_nota}
                                date={obj.fecha_hora_crea}
                                user={obj.user_crea}
                              />
                            )
                          })
                          :
                          <li>Sin notas</li>
                        }
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
              {/* descripcion */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <div className="flex justify-between">
                    <TextContent tag="Descripcion" />
                    <Button
                      className="h-8 w-8 rounded-full hover:bg-gray-300"
                      type="icon"
                      icon="fas fa-pen"
                      onClick={() => {
                        setShowDescModal(true)
                        setGloseOrDesc(false)
                      }} />
                  </div>
                  <div className="max-h-56 overflow-custom">
                    <p className="p-2 leading-tight text-justify whitespace-pre-wrap text-sm">
                      {seekParam(func_objeto, '- PAUSA')}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <div className="flex justify-between">
                    <TextContent tag="Glosa explicativa" />
                    <Button
                      className="h-8 w-8 rounded-full hover:bg-gray-300"
                      type="icon"
                      icon="fas fa-pen"
                      onClick={() => {
                        setShowDescModal(true)
                        setGloseOrDesc(true)
                      }} />
                  </div>
                  <div className="max-h-56 overflow-custom">
                    <p className="p-2 leading-tight text-justify whitespace-pre-wrap text-sm">
                      {/* {seekParam(func_objeto, '- PAUSA')} */}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 mt-6">
                {/* opciones RA */}
                <div className="flex justify-between items-center mb-6">
                  <TextContent tag="Detalles" />
                  <div className="flex items-center justify-between px-3">
                    <Menu
                      direction="bottom"
                      menuButton={
                        <MenuButton
                          disabled={!isPending}
                          className="text-sm focus:outline-none active:outline-none py-1 px-3 rounded-full font-bold transition duration-500 hover:bg-black hover:bg-opacity-10">
                          {isPending ? 'Pendiente' : 'En Trabajo'} <i className="fas fa-chevron-down ml-2"></i>
                        </MenuButton>
                      }
                    >
                      <MenuItem
                        className="text-left hover:text-white hover:bg-blue-500 text-sm"
                      >
                        Pendiente
                      </MenuItem>
                      <MenuItem
                        className="text-left hover:text-white hover:bg-blue-500 text-sm"
                      >
                        En Trabajo
                      </MenuItem>
                    </Menu>
                    {
                      pause &&
                      <Tippy
                        offset={[0, 12]}
                        delay={[100, 0]}
                        placement={"bottom"}
                        content={<span>Actividad en play</span>}
                      >
                        <i className="ml-2 mr-1 mt-1 fas fa-user-clock fa-sm"></i>
                      </Tippy>
                    }
                    <Button
                      className="h-8 w-8 rounded-full hover:bg-gray-300"
                      type="icon"
                      icon="fas fa-clone fa-sm"
                      tippyText="Clonar actividad"
                      onClick={() => { setShowCloneModal(true) }} />
                    {!isPending &&
                      <Button
                        className={`h-8 w-8 rounded-full hover:bg-gray-300 ${pause ? 'hover:text-red-500' : 'hover:text-green-500'}`}
                        type="icon"
                        icon={pause ? 'fas fa-pause fa-sm' : 'fas fa-play fa-sm'}
                        tippyText={pause ? 'Detener tiempo' : 'Reanudar tiempo'}
                        onClick={handlePlayActivity} />
                    }
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-6 gap-10 px-5">
                  {/* select RA */}
                  <div className="col-span-1 lg:col-span-2 lg:border-r border-b lg:border-b-0 pb-10 lg:pb-0 lg grid grid-cols-1 lg:pr-5">
                    <label className="text-xs block py-1.5">Proyecto:</label>
                    <Select
                      selecedValue
                      maxMenuHeight={170}
                      placeholder="Seleccionar"
                      options={ActState.arrayProject}
                      onChange={(option) => { setProject(option) }}
                      value={project} />
                    <label className="text-xs block py-1.5">Sub Proyecto:</label>
                    <Select
                      maxMenuHeight={170}
                      placeholder="Seleccionar"
                      options={arrSubProject}
                      onChange={(option) => { setSubProject(option) }}
                      value={subProject} />
                    <label className="text-xs block py-1.5">Solicita:</label>
                    <Select
                      maxMenuHeight={170}
                      placeholder="Seleccionar"
                      options={ActState.arrayUsersS}
                      onChange={(option) => { setUserS(option) }}
                      value={userS} />
                    <label className="text-xs block py-1.5">Encargado:</label>
                    <Select
                      maxMenuHeight={170}
                      placeholder="Seleccionar"
                      options={ActState.arrayUsersE}
                      onChange={(option) => { setUserE(option) }}
                      value={userE} />
                    <label className="text-xs block py-1.5">Revisor:</label>
                    <Select
                      maxMenuHeight={170}
                      placeholder="Seleccionar"
                      options={ActState.arrayUsersE}
                      onChange={(option) => { setUserR(option) }}
                      value={userR} />
                  </div>
                  {/* inputs y tiempos */}
                  <div className="col-span-1 lg:col-span-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10 gap-4">
                      <Input
                        className="text-sm"
                        name="priority"
                        value={priority}
                        field="Nᵒ prioridad"
                        onChange={onChangeValues} />
                      <Input
                        className="text-sm"
                        name="ticket"
                        value={ticket}
                        field="Ticket"
                        onChange={onChangeValues} />
                      <Input
                        className="text-sm"
                        name="time"
                        value={time}
                        field="Tiempo estimado"
                        onChange={onChangeValues} />
                    </div>
                    <hr />
                    <div className="mt-10 border-b pb-10 lg:pb-0 lg:border-b-0 ">
                      <TableTimes data={{ tiempo_estimado, tiempo_hoy, tiempo_trabajado }} />
                    </div>
                  </div>
                </div>
                {/* archivos */}
                <h5 className="mt-10 mb-5 font-bold">
                  Archivos adjuntos:
                  <label className="text-xs text-gray-400 ml-1 font-normal">{file !== null ? file.name : '(No hay archivo seleccionado)'}</label>
                </h5>
                <ul className="text-sm grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                  {
                    tarea_documentos.length > 0 ?
                      tarea_documentos.map(file => {
                        return (
                          <ListDocs
                            key={file.id_docum}
                            id={file.id_docum}
                            idRef={file.id_det}
                            name={file.nom_docum}
                            route={file.ruta_docum} />
                        )
                      }) : 'No hay documentos...'
                  }
                </ul>
              </div>
              {/* botones */}
              <div className="mt-16 md:flex justify-between">
                <div className="md:flex items-center">
                  <Button
                    className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-100 py-2.5 px-4 mb-2 md:mb-0 block w-full md:w-max md:inline"
                    type="iconText"
                    icon="fas fa-trash-alt fa-lg"
                    iconFirst
                    name="Actividad"
                    onClick={handleDeleteActivity}
                  />
                  <label
                    htmlFor="archivoForm"
                    className="transition duration-500 text-center cursor-pointer hover:bg-blue-100 text-blue-600 font-semibold capitalize py-2.5 px-6 rounded-full mb-2 md:mb-0 block md:inline"
                  >
                    <input
                      key={resetFile || ''}
                      id="archivoForm"
                      className="text-xs hidden"
                      name="archivo"
                      onChange={onChangeFile}
                      type="file"
                    />
                    <i className="fas fa-cloud-upload-alt fa-lg mr-2"></i>
                    archivo
                  </label>
                </div>
                <div className="md:flex items-center">
                  <Button
                    className="bg-red-500 text-white rounded-full hover:bg-red-600 mb-2 md:mb-0 md:mr-2 py-2.5 block w-full md:w-max md:inline"
                    shadow
                    name="Cancelar"
                    onClick={handleBack}
                  />
                  <Button
                    className="bg-green-500 text-white rounded-full hover:bg-green-600 mb-2 md:mb-0 py-2.5 block w-full md:w-max md:inline"
                    shadow
                    name="Guardar cambios"
                    onClick={handleSaveChanges}
                  />
                </div>
              </div>
            </div>

            {/* container fin */}
          </div>

          {/* modal clone */}
          <Modal showModal={showCloneModal} onClose={() => setShowCloneModal(false)}
            className="max-w-7xl" padding="p-10">
            <h1 className="capitalize text-xl font-semibold mb-2">Clonar actividad: {id_det}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="col-span-1">
                <label className="text-xs block py-1.5">Proyecto:</label>
                <Select
                  placeholder="Seleccionar"
                  options={ActState.arrayProject}
                  onChange={(option) => { setProject(option) }}
                  value={project} />
                <label className="text-xs block py-1.5">Sub Proyecto:</label>
                <Select
                  placeholder="Seleccionar"
                  options={arrSubProject}
                  onChange={(option) => { setSubProject(option) }}
                  value={subProject} />
                <label className="text-xs block py-1.5">Solicita:</label>
                <Select
                  placeholder="Seleccionar"
                  options={ActState.arrayUsersS}
                  onChange={(option) => { setUserS(option) }}
                  value={userS} />
                <label className="text-xs block py-1.5">Encargado:</label>
                <Select
                  placeholder="Seleccionar"
                  options={ActState.arrayUsersE}
                  onChange={(option) => { setUserE(option) }}
                  value={userE} />
                <label className="text-xs block py-1.5">Revisor:</label>
                <Select
                  placeholder="Seleccionar"
                  options={ActState.arrayUsersE}
                  onChange={(option) => { setUserR(option) }}
                  value={userR} />
                <Input
                  field="Nᵒ prioridad"
                  name="priority"
                  value={priority}
                  onChange={onChangeValues}
                />
                <Input
                  field="ticket"
                  name="ticket"
                  value={ticket}
                  onChange={onChangeValues} />
                <Input
                  field="tiempo estimado"
                  name="time"
                  value={time}
                  onChange={onChangeValues} />
                {/* <ul className="text-sm grid grid-cols-1 gap-2 mt-4 max-h-40 overflow-custom">
                  <h5 className="text-sm truncate mt-4">
                  Archivos: <label className="font-semibold">
                    No hay archivo seleccionado
                  </label>
                </h5>
                  {
                    files.map(file => {
                      return (
                        <ListDocs key={file.id} name={file.name} />
                      )
                    })
                  }
                </ul> */}
              </div>
              <div className="col-span-1 lg:col-span-2">
                <Input
                  field="actividad"
                  name="title"
                  value={title}
                  onChange={onChangeValues} />
                <TextArea
                  field="descripcion"
                  name="desc"
                  value={desc}
                  onChange={onChangeValues} />
                <TextArea
                  field="glosa explicativa"
                  name="gloss"
                  value={gloss}
                  onChange={onChangeValues} />
              </div>
            </div>
            <h5 className="text-sm truncate mt-10">
              Archivos: <label className="font-semibold">
                No hay archivo seleccionado
              </label>
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-16">
              <label
                htmlFor="archivoForm"
                className="transition duration-500 text-center cursor-pointer hover:bg-blue-100 text-blue-600 font-semibold capitalize py-2 px-6 rounded-full mb-2 md:mb-0 block md:inline"
              >
                <input
                  key={resetFile || ''}
                  id="archivoForm"
                  className="text-xs hidden"
                  name="archivo"
                  onChange={onChangeFile}
                  type="file"
                />
                <i className="fas fa-cloud-upload-alt fa-lg mr-2"></i>
                archivo
              </label>
              <Button
                className="rounded-full border border-red-500 hover:bg-red-500 text-red-500 hover:text-white py-2 order-last md:order-none"
                name="cancelar"
                block
                shadow
              />
              <Button
                className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-white py-2"
                name="Guardar en trabajo"
                block
                shadow
              />
              <Button
                className="rounded-full bg-green-400 hover:bg-green-600 text-white py-2"
                name="Guardar"
                block
                shadow
              />
            </div>
          </Modal>

          {/* modal add/update note */}
          <Modal showModal={showModal} onClose={showModalFalse} className="max-w-3xl">
            <h1 className="text-xl font-semibold mb-5">{idNote !== null ? 'Editar Nota' : 'Agregar nueva nota'}</h1>
            <div className="w-full">
              {
                updateOrAdd ?
                  <>
                    <p className="text-xs">Mensajes predeterminados:</p>
                    <div className="py-3 pl-3 pr-1 mx-auto overflow-custom h-44 mt-1 mb-5 bg-gray-100 rounded-md">
                      {
                        defaultNotes.map((note, index) => (
                          <ListNote
                            key={note.id}
                            isDetail={true}
                            type="listAction"
                            idActivity={ActState.activityDetails.id_det}
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
                    <label className="mb-2 text-xs">Notas:</label>
                    <ul className="max-h-44 overflow-custom bg-gray-100 rounded-md py-3 pl-3">
                      {
                        ActState.activityDetails.notas.length > 0 ?
                          ActState.activityDetails.notas.map((obj, index) => {
                            if (ActState.activityDetails.id_det === obj.id_det) {
                              return (
                                <ListNote
                                  type='modal'
                                  key={obj.id_nota}
                                  idNote={obj.id_nota}
                                  desc={obj.desc_nota}
                                  date={obj.fecha_hora_crea}
                                  user={obj.user_crea}
                                  isDetail={true}
                                  idActivity={id_det}
                                  onclick={handleGetIdNote}
                                  activeColor={idNote === obj.id_nota ? 'text-green-600' : 'text-gray-500'}
                                  separator={ActState.activityDetails.notas.length !== index + 1}
                                />
                              )
                            } else {
                              return 'No hay notas...'
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
                className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-full font-semibold"
                name={idNote !== null ? (updateOrAdd ? 'Agregar' : 'Editar') : 'Agregar'}
                onClick={updateOrAdd ? () => handleAddNewNote() : () => handleUpdateNote()}
              />
            </div>
          </Modal>

          {/* modal desc */}
          <Modal showModal={showDescModal} onClose={onCloseDescModal} className="max-w-3xl">
            <h1 className="text-xl font-semibold mb-5">Editar {gloseOrDesc ? 'glosa' : 'Descripcion'}</h1>
            <div className="w-full">
              <TextArea
                field={gloseOrDesc ? 'Glosa' : 'Descripcion'}
                name={gloseOrDesc ? 'gloss' : 'desc'}
                value={gloseOrDesc ? gloss : desc}
                onChange={onChangeValues} />
            </div>
            <br />
            <div className="flex justify-end">
              <Button
                className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-full font-semibold"
                name="Editar"
                onClick={handleSaveChanges}
              />
            </div>
          </Modal>
        </>
      }
    </>
  )
}

export default Form
