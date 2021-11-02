import moment from 'moment'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UiContext } from '../../context/UiContext'
import { ActivityContext } from '../../context/ActivityContext'
import ListNote from '../ui/list/ListNote'
import Ptext from '../ui/text/Ptext'
import Input from '@material-tailwind/react/Input'
import Button from '../ui/buttons/Button'
import Select from 'react-select';
import ButtonColor from '../ui/buttons/ButtonColor'
import Modal from '../ui/modal/Modal'
import PDefaultNotes from '../ui/text/PDefaultNotes'
import TextArea from '../ui/inputs/TextArea'
import TableTimes from '../ui/times/TableTimes'
import ListDocs from '../ui/list/ListDocs'
import Tippy from '@tippyjs/react'
import { useForm } from '../../hooks/useForm'
import { checkForms, seekParam } from '../../helpers/auxFunctions'
import { alertQuest, alertTimer, normalAlert } from '../../helpers/alerts'

let today = new Date()
today = moment(today).format('yyyy-MM-DD')
const initialState = {
  inputEdit: '',
  inputAdd: ''
}

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

function ActivityDetailScreen() {

  let randomString = Math.random().toString(36)
  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)
  const { functions: UiFunc } = useContext(UiContext)
  const [{ inputEdit, inputAdd }, onChangeValues, reset] = useForm(initialState)
  const [{ idNote }, setNoteActive] = useState({ idNote: null })
  const [updateOrAdd, setUpdateOrAdd] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showModalDesc, setShowModalDesc] = useState(false)
  const [project, setProject] = useState(null)
  const [subProject, setSubProject] = useState(null)
  const [userR, setUserR] = useState(null)
  const [userS, setUserS] = useState(null)
  const [userE, setUserE] = useState(null)
  const [file, setFile] = useState(null)
  const [resetFile, setResetFile] = useState(randomString)
  const [newSubProjectArray, setNewSubProjectArray] = useState(null)
  const [values, setValues] = useState(initialStateRA)
  const [isActPlay, setIsActPlay] = useState(false)
  const { inputTicket, inputPriority, inputTime, inputDesc } = values

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

    const data = { id_actividad: ActState.activityDetails.id_det, description: inputAdd }
    const action = () => {
      ActFunc.addNewNote(data, true, ActState.activityDetails.id_det)
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
      ActFunc.updateNote(dataUpdate, true, ActState.activityDetails.id_det)
      showModalFalse()
    }
    const dataAdd = { id_actividad: ActState.activityDetails.id_det, description: inputEdit }
    const actionAdd = () => {
      ActFunc.addNewNote(dataAdd, true, ActState.activityDetails.id_det)
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

  const showModalDescFalse = () => {
    setShowModalDesc(false)
    setValues({
      ...values,
      inputDesc: ActState.activityDetails.func_objeto
    })
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

  useEffect(() => {
    if (ActState.activityDetails !== null) {
      const validation1 = ActState.activityDetails.pausas.length > 0
      const validation2 = ActState.activityDetails.estado === 2
      validation1 && validation2 && setIsActPlay(true)
    }
  }, [ActState.activityDetails])

  return (
    <>
      {
        ActState.activityDetails !== null &&
        <>
          <div className="container mx-auto text-gray-700">
            <div className="bg-white p-10 rounded-lg shadow-lg my-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 mb-10">
                <div className="text-2xl font-bold text-gray-700 capitalize col-span-2">
                  <Button
                    className="mr-3 hover:text-blue-500 pr-2"
                    type="icon"
                    icon="fas fa-chevron-left"
                    onClick={handleBack} />
                  Detalle actividad: {ActState.activityDetails.id_det}, {ActState.activityDetails.actividad}
                </div>
                <div className="rounded-full p-1 bg-gray-100 place-self-end col-span-1 mt-4 lg:mt-0">
                  <ButtonColor
                    color="bg-gray-300"
                    isUpdate={true}
                    priority={1000}
                    id={ActState.activityDetails.id_det}
                    updatePriority={handleUpdatePriority}
                    isTippy={true}
                    tippyText="Sin Prioridad"
                    offSet={10}
                    hwBtn="5" />

                  <ButtonColor
                    color={ActState.userData.usuario.color_prioridad_baja}
                    isUpdate={true}
                    priority={600}
                    id={ActState.activityDetails.id_det}
                    updatePriority={handleUpdatePriority}
                    isTippy={true}
                    tippyText="Prioridad Baja"
                    offSet={10}
                    hwBtn="5" />

                  <ButtonColor
                    color={ActState.userData.usuario.color_prioridad_media}
                    isUpdate={true}
                    priority={400}
                    id={ActState.activityDetails.id_det}
                    updatePriority={handleUpdatePriority}
                    isTippy={true}
                    tippyText="Prioridad Media"
                    offSet={10}
                    hwBtn="5" />

                  <ButtonColor
                    color={ActState.userData.usuario.color_prioridad_alta}
                    isUpdate={true}
                    priority={100}
                    id={ActState.activityDetails.id_det}
                    updatePriority={handleUpdatePriority}
                    isTippy={true}
                    tippyText="Prioridad Alta"
                    offSet={10}
                    hwBtn="5" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="col-span-1">
                  <Ptext tag="Encargado:" value={ActState.activityDetails.encargado_actividad}
                  />
                  <Ptext tag="Proyecto:" value={ActState.activityDetails.proyecto_tarea.proyecto}
                  />
                  <Ptext tag="Sub Proyecto:" value={ActState.activityDetails.subproyectos_tareas !== null ? ActState.activityDetails.subproyectos_tareas.nombre_sub_proy !== '' ? ActState.activityDetails.subproyectos_tareas.nombre_sub_proy : 'Ninguno' : 'Ninguno'}
                  />
                  <Ptext tag="Solicitante:" value={ActState.activityDetails.user_solicita}
                  />
                  <Ptext tag="Estado:" value={ActState.activityDetails.estado === 1 ? "Pendiente" : ActState.activityDetails.estado === 2 && "En trabajo"}
                  />
                  <Ptext tag="ID actividad:" value={ActState.activityDetails.id_det}
                  />
                  <Ptext tag="Ticket:" value={ActState.activityDetails.ticket === 0 ? 'Ninguno' : ActState.activityDetails.ticket} />
                  <Ptext tag="Fecha de Creacion:" value={moment(ActState.activityDetails.fecha_tx).format('DD-MM-yyyy')}
                  />
                  <Ptext tag="Transcurridos:" value={`${moment(ActState.activityDetails.fecha_tx).diff(today, 'days') - (moment(ActState.activityDetails.fecha_tx).diff(today, 'days') * 2)} Dias`}
                  />
                  <div className="flex items-center">
                    <Ptext
                      tag="Prioridad:"
                      value={ActState.activityDetails.prioridad_etiqueta === 1000 ? 'S/P' : ActState.activityDetails.prioridad_etiqueta === 600 ? 'Baja' : ActState.activityDetails.prioridad_etiqueta === 400 ? 'Media' : ActState.activityDetails.prioridad_etiqueta === 100 && 'Alta'} />
                    <p className={`
                    ${ActState.activityDetails.prioridad_etiqueta === 1000 ? 'bg-gray-200' : ActState.activityDetails.prioridad_etiqueta === 600 ? ActState.userData.usuario.color_prioridad_baja : ActState.activityDetails.prioridad_etiqueta === 400 ? ActState.userData.usuario.color_prioridad_media : ActState.activityDetails.prioridad_etiqueta === 100 && ActState.userData.usuario.color_prioridad_alta} 
                    h-5 w-5 rounded-full ml-2`
                    }></p>
                  </div>
                  <Ptext tag="Prioridad RA:" value={ActState.activityDetails.num_prioridad} />
                </div>
                <div className="col-span-2 bg-gray-100 py-2 px-4 rounded-md">
                  <div className="flex justify-between">
                    <Ptext tag="Informes Diarios (notas):" />
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
                  <div className="scroll-row-detail h-card-details">
                    <ul className="mt-1 text-sm">
                      {ActState.activityDetails.notas.length > 0 ?
                        ActState.activityDetails.notas.map(obj => {
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
                  <Ptext tag="Descripcion:" />
                  <Button
                    className="h-8 w-8 rounded-full hover:bg-gray-300"
                    type="icon"
                    icon="fas fa-pen"
                    onClick={() => setShowModalDesc(true)} />
                </div>
                <div className="h-desc scroll-row-detail">
                  <p className="p-2 leading-tight text-justify salto text-sm">
                    {seekParam(ActState.activityDetails.func_objeto, '- PAUSA')}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 mt-6">
                <div className="flex justify-between items-center mb-6">
                  <Ptext tag="Opciones Registro de Avance: (sin funcionalidades por ahora)" />
                  <div className="flex items-center justify-between px-3">
                    {
                      isActPlay &&
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
                      tippyText="Clonar actividad" />
                    <Button
                      className={`h-8 w-8 rounded-full hover:bg-gray-300 ${isActPlay ? 'hover:text-red-500' : 'hover:text-green-500'}`}
                      type="icon"
                      icon={isActPlay ? 'fas fa-pause fa-sm' : 'fas fa-play fa-sm'}
                      tippyText={isActPlay ? 'Detener tiempo' : 'Reanudar tiempo'} />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-10 px-5">
                  <div className="col-span-4 lg:col-span-1 lg:border-r border-b lg:border-b-0 pb-10 lg:pb-0 lg grid grid-cols-1 gap-2 lg:pr-5 place-content-between">
                    <div>
                      <label className="text-xs">Proyecto:</label>
                      <Select
                        placeholder="Seleccionar"
                        options={ActState.arrayProject}
                        onChange={(option) => { setProject(option) }}
                        value={project} />
                    </div>
                    <div>
                      <label className="text-xs">Sub Proyecto:</label>
                      <Select
                        placeholder="Seleccionar"
                        options={newSubProjectArray}
                        onChange={(option) => { setSubProject(option) }}
                        value={subProject} />
                    </div>
                    <div>
                      <label className="text-xs">Solicita:</label>
                      <Select
                        placeholder="Seleccionar"
                        options={ActState.arrayUsersS}
                        onChange={(option) => { setUserS(option) }}
                        value={userS} />
                    </div>
                    <div>
                      <label className="text-xs">Encargado:</label>
                      <Select
                        placeholder="Seleccionar"
                        options={ActState.arrayUsersE}
                        onChange={(option) => { setUserE(option) }}
                        value={userE} />
                    </div>
                    <div>
                      <label className="text-xs">Revisor:</label>
                      <Select
                        placeholder="Seleccionar"
                        options={ActState.arrayUsersE}
                        onChange={(option) => { setUserR(option) }}
                        value={userR} />
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-3">
                    <div className="flex flex-wrap lg:flex-nowrap mb-10 gap-5 justify-center">
                      <Input
                        type="text"
                        name="inputPriority"
                        value={inputPriority}
                        onChange={(e) => setValues({
                          ...values,
                          inputPriority: parseInt(e.target.value)
                        })}
                        color="blue"
                        size="regular"
                        outline={true}
                        placeholder="Nᵒ prioridad"
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }} />
                      <Input
                        type="text"
                        name="inputTicket"
                        value={inputTicket}
                        onChange={(e) => setValues({
                          ...values,
                          inputTicket: parseInt(e.target.value)
                        })}
                        color="blue"
                        size="regular"
                        outline={true}
                        placeholder="Ticket"
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }} />
                      <Input
                        type="text"
                        name="inputTime"
                        value={inputTime}
                        onChange={(e) => setValues({
                          ...values,
                          inputTime: parseInt(e.target.value)
                        })}
                        color="blue"
                        size="regular"
                        outline={true}
                        placeholder="Tiempo estimado"
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <hr />
                    <div className="my-10">
                      <TableTimes />
                    </div>
                    <hr />
                    <p className="mt-10 mb-2 font-bold">
                      Archivos adjuntos:
                      <label className="text-xs text-gray-400 ml-1 font-normal">{file !== null ? file.name : '(No hay archivo seleccionado)'}</label>
                    </p>
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
                </div>
              </div>
              <div className="mt-16 flex justify-between">
                <div className="flex items-center">
                  <Button
                    className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-100 py-1 px-4"
                    type="iconText"
                    icon="fas fa-trash-alt fa-lg"
                    iconFirst
                    name="Actividad"
                    onClick={handleDeleteActivity}
                  />
                  <label
                    htmlFor="archivoForm"
                    className="transition duration-500 cursor-pointer hover:bg-blue-100 text-blue-600 text-xs font-bold uppercase py-2.5 px-6 rounded-full"
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
                <div className="flex items-center">
                  <Button
                    className="bg-red-500 text-white rounded-full hover:bg-red-600"
                    name="Cancelar"
                    onClick={handleBack}
                  />
                  <span className="mr-2"></span>
                  <Button
                    className="bg-green-500 text-white rounded-full hover:bg-green-600"
                    name="Guardar cambios"
                  />
                </div>
              </div>
            </div>

            {/* container fin */}
          </div>

          <Modal showModal={showModal} onClose={showModalFalse} className="md:w-4/5 lg:w-4/6 xl:w-3/6">
            <h1 className="text-xl font-semibold mb-5">{idNote !== null ? 'Editar Nota' : 'Agregar nueva nota'}</h1>
            <div className="w-full">
              {
                updateOrAdd ?
                  <>
                    <p className="text-xs">Mensajes predeterminados:</p>
                    <div className="py-3 pl-3 pr-1 mx-auto mt-1 mb-5 bg-gray-100 rounded-md">
                      <PDefaultNotes from={true} idAct={ActState.activityDetails.id_det} noteText="Inicializar actividad urgente" onclick={showModalFalse} updatePriority={true} />
                      <PDefaultNotes from={true} idAct={ActState.activityDetails.id_det} noteText="esperando respuesta de cliente" onclick={showModalFalse} />
                      <PDefaultNotes from={true} idAct={ActState.activityDetails.id_det} noteText="esperando actividad.." onclick={showModalFalse} />
                      <PDefaultNotes from={true} idAct={ActState.activityDetails.id_det} noteText="trabajando..." onclick={showModalFalse} />
                      <PDefaultNotes from={true} idAct={ActState.activityDetails.id_det} noteText="sin avance" onclick={showModalFalse} />
                      <PDefaultNotes from={true} idAct={ActState.activityDetails.id_det} noteText="en cola" onclick={showModalFalse} isSeparator={false} />
                    </div>
                    <TextArea
                      field="Descripcion nota"
                      value={inputAdd}
                      name="inputAdd"
                      onChange={onChangeValues} />
                  </> :
                  <>
                    <label className="mb-2 text-xs">Notas:</label>
                    <ul className="min-h-80 scroll-row bg-gray-100 rounded-md py-2 pl-2">
                      {
                        ActState.activityDetails.notas.length > 0 ?
                          ActState.activityDetails.notas.map(obj => {
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

          <Modal showModal={showModalDesc} onClose={showModalDescFalse} className="md:w-4/5 lg:w-4/6 xl:w-3/6">
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

export default ActivityDetailScreen
