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
import { alertQuest, alertTimer, normalAlert, respAlert } from '../../../helpers/alerts'
import moment from 'moment'

let today = moment(new Date()).format('yyyy-MM-DD')

const initialStateRA = {
  inputDesc: '',
  inputTicket: '',
  inputPriority: '',
  inputTime: ''
}

const files = [
  { id: 2, name: 'file_EJEMPLO1.png' },
  { id: 3, name: 'file_EJEMPLO2.png' },
  { id: 4, name: 'file_EJEMPLO3asassssssssss.png' },
  { id: 5, name: 'file_EJEMPLO4.png' },
  { id: 6, name: 'file_EJEMPLO5.png' }
]

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
    id_revisor, b_proyecto,
    id_todo_task,
    notas,
    num_ticket_edit,
    pausas,
    prioridad_etiqueta,
    proyectoIdProy,
    proyectoTareaIdProy,
    proyecto_tarea,
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
    user_solicita

  } = data

  const initialState = {
    inputEdit: '',
    inputAdd: '',
    desc: func_objeto,
    ticket: num_ticket_edit,
    priority: '',
    time: tiempo_estimado,
    title: actividad,
    glose: ''
  }

  const pause = pausas.length > 0 && pausas[pausas.length - 1].boton === 2
  const isPending = estado === 1
  let randomString = Math.random().toString(36)
  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)
  const { functions: UiFunc } = useContext(UiContext)
  const [{ inputEdit, inputAdd, desc, priority, ticket, time, title, glose }, onChangeValues, reset] = useForm(initialState)
  const [{ idNote }, setNoteActive] = useState({ idNote: null })
  const [updateOrAdd, setUpdateOrAdd] = useState(false)
  // modals
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
  const [newSubProjectArray, setNewSubProjectArray] = useState(null)
  // selects
  const [resetFile, setResetFile] = useState(randomString)
  const [values, setValues] = useState(initialStateRA)
  // const [isActPlay, setIsActPlay] = useState(pause)
  const { inputPriority, inputDesc } = values

  const handleBack = async () => {
    await UiFunc.setIsLoading(true)
    await ActFunc.getActivities()
    await UiFunc.activityView()
    await ActFunc.getNotify()
    await ActFunc.getTimes()
    setResetFile(randomString)
    setFile(null)
  }

  const handleUpdatePriority = (id, priority) => {
    let data = { prioridad_numero: priority, id_actividad: id, }
    ActFunc.updatePriority(data, true, id)
  }

  const handleAddNewNote = () => {

    const vDesc = checkForms(inputAdd)
    if (vDesc.state) {
      normalAlert('warning', `Caracter <b class="text-gray-600 text-xl">${vDesc.char}</b> no pemitido, campo: <b>Nota</b> <br><br> <i class="text-blue-500">Caracteres no permitidos:</i> <b>${vDesc.list}</b>`, 'Entiendo')
      return
    }

    const data = { id_actividad: id_det, description: inputAdd }
    const action = () => {
      ActFunc.addNewNote(data, true, id_det)
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

    const dataUpdate = { id_nota: idNote, description: inputEdit }
    const actionUpdate = () => {
      ActFunc.updateNote(dataUpdate, true, id_det)
      showModalFalse()
    }
    const dataAdd = { id_actividad: id_det, description: inputEdit }
    const actionAdd = () => {
      ActFunc.addNewNote(dataAdd, true, id_det)
      showModalFalse()
    }
    if (idNote !== null) {
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

  const onCloseDescModal = () => {
    setShowDescModal(false)
    setValues({
      ...values,
      inputDesc: ActState.activityDetails.func_objeto
    })
  }

  const onCloseCloneModal = () => {
    setShowCloneModal(false)
  }

  const handleGetIdNote = (idNote, description) => {
    reset()
    setNoteActive({ idNote, description })
    initialState.inputEdit = description
  }

  const handleDeleteActivity = () => {
    const action = () => {
      console.log('se elimino fake');
    }
    alertQuest('info', '¿Estas seguro de eliminar esta actividad?', 'No Cancelar', 'Si, eliminar', action)
  }

  const onChangeFile = (event) => {
    if (event.target.files[0].size < 5242881) {
      setFile(event.target.files[0])
    }
    else {
      setFile(null)
      setResetFile(randomString)
      alertTimer(
        false,
        'info',
        3000,
        'Archivo excede el peso permitido por el sistema, peso maximo 5 mb'
      )
    }
  }

  const handleClone = () => {
    setShowCloneModal(false)
  }

  const handlePlayActivity = async () => {

    UiFunc.setIsLoading(true)

    if (pause) { // se pusara
      const html = '<p>Ingrese el detalle de la detancia (obligatorio):</p>'
      const resp = await respAlert({ html })

      if (resp) {
        const data = {
          mensaje: resp,
          id_actividad: id_det
        }
        ActFunc.playActivity(data)
      }
    }
    else { // se pondra play
      ActFunc.playActivity({ id_actividad: id_det })
    }
  }

  useEffect(() => {
    if (project !== null) {
      const tempArray = ActState.arraySubProject.filter(item => project.id === item.id)
      const tempSubProj = tempArray.filter(item => ActState.activityDetails.id_sub_proyecto === item.id)
      tempSubProj !== [] && setSubProject(tempSubProj)
      setNewSubProjectArray(tempArray)
    }
    else {
      setNewSubProjectArray(ActState.arraySubProject)
    }
  }, [project])

  useEffect(() => {
    if (ActState.activityDetails !== null) {
      setValues({
        ...values,
        inputTicket: ActState.activityDetails.num_ticket_edit,
        inputPriority: ActState.activityDetails.num_prioridad,
        inputDesc: ActState.activityDetails.func_objeto
      })
      const tempProj = ActState.arrayProject.filter(item => ActState.activityDetails.id_proy === item.id)
      setProject(tempProj[0])

      const tempUserS = ActState.arrayUsersS.filter(item => ActState.activityDetails.user_solicita === item.label)
      setUserS(tempUserS[0])

      const tempUserE = ActState.arrayUsersE.filter(item => ActState.activityDetails.encargado_actividad === item.label)
      setUserE(tempUserE[0])
    }
  }, [ActState.activityDetails])

  return (
    <>
      {
        ActState.activityDetails !== null &&
        <>
          <div className="md:container mx-1 sm:mx-3 md:mx-auto text-gray-700">
            <div className="bg-white p-3 sm:p-6 md:p-8 rounded-lg shadow-lg my-10">
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
                    updatePriority={handleUpdatePriority}
                    isTippy={true}
                    tippyText="Sin Prioridad"
                    offSet={10}
                    hwBtn="5" />

                  <ButtonColor
                    color={ActState.userData.usuario.color_prioridad_baja}
                    isUpdate={true}
                    priority={600}
                    id={id_det}
                    updatePriority={handleUpdatePriority}
                    isTippy={true}
                    tippyText="Prioridad Baja"
                    offSet={10}
                    hwBtn="5" />

                  <ButtonColor
                    color={ActState.userData.usuario.color_prioridad_media}
                    isUpdate={true}
                    priority={400}
                    id={id_det}
                    updatePriority={handleUpdatePriority}
                    isTippy={true}
                    tippyText="Prioridad Media"
                    offSet={10}
                    hwBtn="5" />

                  <ButtonColor
                    color={ActState.userData.usuario.color_prioridad_alta}
                    isUpdate={true}
                    priority={100}
                    id={id_det}
                    updatePriority={handleUpdatePriority}
                    isTippy={true}
                    tippyText="Prioridad Alta"
                    offSet={10}
                    hwBtn="5" />
                </div>
              </div>
              {/* informas y lista de propiedas de actividad */}
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
                <div className="col-span-2 bg-gray-100 py-2 px-4 rounded-md mt-4 md:mt-0">
                  <div className="flex justify-between">
                    <TextContent tag="Informes Diarios (notas)" />
                    <div>
                      <Button
                        className="h-8 w-8 rounded-full hover:bg-gray-300"
                        type="icon"
                        icon="fas fa-plus"
                        onClick={showModalAddNote} />
                      <Button
                        className="h-8 w-8 rounded-full hover:bg-gray-300"
                        type="icon"
                        icon="fas fa-pen"
                        onClick={showModalUpdateNote} />
                    </div>
                  </div>
                  <div className="max-h-56 overflow-custom">
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
              </div>
              <div className="grid grid-cols-1 mt-6 bg-gray-100 rounded-md py-2 px-4">
                <div className="flex justify-between">
                  <TextContent tag="Descripcion" />
                  <Button
                    className="h-8 w-8 rounded-full hover:bg-gray-300"
                    type="icon"
                    icon="fas fa-pen"
                    onClick={() => setShowDescModal(true)} />
                </div>
                <div className="max-h-96 overflow-custom">
                  <p className="p-2 leading-tight text-justify salto text-sm">
                    {seekParam(func_objeto, '- PAUSA')}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 mt-6">
                <div className="flex justify-between items-center mb-6">
                  <TextContent tag="Opciones Registro de Avance: (sin funcionalidades por ahora)" />
                  <div className="flex items-center justify-between px-3">
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
                <div className="mt-4 grid grid-cols-4 gap-10 px-5">
                  <div className="col-span-4 lg:col-span-1 lg:border-r border-b lg:border-b-0 pb-10 lg:pb-0 lg grid grid-cols-1 lg:pr-5">
                    <label className="text-xs">Proyecto:</label>
                    <Select
                      placeholder="Seleccionar"
                      options={ActState.arrayProject}
                      onChange={(option) => { setProject(option) }}
                      value={project} />
                    <label className="text-xs">Sub Proyecto:</label>
                    <Select
                      placeholder="Seleccionar"
                      options={newSubProjectArray}
                      onChange={(option) => { setSubProject(option) }}
                      value={subProject} />
                    <label className="text-xs">Solicita:</label>
                    <Select
                      placeholder="Seleccionar"
                      options={ActState.arrayUsersS}
                      onChange={(option) => { setUserS(option) }}
                      value={userS} />
                    <label className="text-xs">Encargado:</label>
                    <Select
                      placeholder="Seleccionar"
                      options={ActState.arrayUsersE}
                      onChange={(option) => { setUserE(option) }}
                      value={userE} />
                    <label className="text-xs">Revisor:</label>
                    <Select
                      placeholder="Seleccionar"
                      options={ActState.arrayUsersE}
                      onChange={(option) => { setUserR(option) }}
                      value={userR} />
                  </div>
                  <div className="col-span-4 lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10 gap-4">
                      <Input
                        className="text-sm"
                        name="inputPriority"
                        value={inputPriority}
                        field="Nᵒ prioridad"
                        onChange={(e) => setValues({
                          ...values,
                          inputPriority: parseInt(e.target.value)
                        })} />
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
                      <TableTimes />
                    </div>
                  </div>
                </div>
                <h5 className="mt-10 font-bold">
                  Archivos adjuntos:
                  <label className="text-xs text-gray-400 ml-1 font-normal">{file !== null ? file.name : '(No hay archivo seleccionado)'}</label>
                </h5>
                <ul className="text-sm grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                  {
                    files.map(file => {
                      return (
                        <ListDocs key={file.id} name={file.name} />
                      )
                    })
                  }
                </ul>
              </div>
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
                  />
                </div>
              </div>
            </div>

            {/* container fin */}
          </div>

          {/* modal clone */}
          <Modal showModal={showCloneModal} onClose={onCloseCloneModal} className="max-w-7xl p-10">
            <h1 className="capitalize text-xl font-semibold mb-2">Clonar actividad: {id_det}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="col-span-1">
                <label className="text-xs p-4">Proyecto:</label>
                <Select
                  placeholder="Seleccionar"
                  options={ActState.arrayProject}
                  onChange={(option) => { setProject(option) }}
                  value={project} />
                <label className="text-xs p-4">Sub Proyecto:</label>
                <Select
                  placeholder="Seleccionar"
                  options={newSubProjectArray}
                  onChange={(option) => { setSubProject(option) }}
                  value={subProject} />
                <label className="text-xs p-4">Solicita:</label>
                <Select
                  placeholder="Seleccionar"
                  options={ActState.arrayUsersS}
                  onChange={(option) => { setUserS(option) }}
                  value={userS} />
                <label className="text-xs p-4">Encargado:</label>
                <Select
                  placeholder="Seleccionar"
                  options={ActState.arrayUsersE}
                  onChange={(option) => { setUserE(option) }}
                  value={userE} />
                <label className="text-xs p-4">Revisor:</label>
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
                <ul className="text-sm grid grid-cols-1 gap-2 mt-4 max-h-40 overflow-custom">
                  <h5 className="text-sm truncate">
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
                </ul>
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
                  name="glose"
                  value={glose}
                  onChange={onChangeValues} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
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
                  <Button
                    className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-white py-2.5"
                    name="Guardar en trabajo"
                    block
                    shadow
                  />
                  <Button
                    className="rounded-full border border-red-500 hover:bg-red-500 text-red-500 hover:text-white py-2.5 order-last md:order-none"
                    name="cancelar"
                    block
                    shadow
                  />
                  <Button
                    className="rounded-full bg-green-400 hover:bg-green-600 text-white py-2.5"
                    name="Guardar"
                    block
                    shadow
                  />
                </div>
              </div>
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
                    <div className="py-3 pl-3 pr-1 mx-auto mt-1 mb-5 bg-gray-100 rounded-md">
                      {
                        defaultNotes.map((note, index) => (
                          <ListNote
                            key={note.id}
                            from
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
                    <ul className="max-h-56 overflow-custom bg-gray-100 rounded-md py-3 pl-3">
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
                                  idActivity={ActState.activityDetails.id_det}
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
            <h1 className="text-xl font-semibold mb-5">Editar descripcion</h1>
            <div className="w-full">
              <TextArea
                field="Descripcion"
                name="inputDesc"
                value={inputDesc}
                onChange={(e) => setValues({
                  ...values,
                  inputDesc: e.target.value
                })} />
            </div>
            <br />
            <div className="flex justify-end">
              <Button
                className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-full font-semibold"
                name="Editar"
              />
            </div>
          </Modal>
        </>
      }
    </>
  )
}

export default Form
