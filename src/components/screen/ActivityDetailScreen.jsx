import moment from 'moment'
import React, { useContext, useState } from 'react'
import { UiContext } from '../../context/UiContext'
import { ActivityContext } from '../../context/ActivityContext'
import ButtonUnText from '../ui/buttons/ButtonUnText'
import ListNote from '../ui/list/ListNote'
import Ptext from '../ui/text/Ptext'
import Input from '@material-tailwind/react/Input'
import Button from '@material-tailwind/react/Button'
import Select from 'react-select';
import ButtonColor from '../ui/buttons/ButtonColor'
import Modal from '@material-tailwind/react/Modal'
import ModalHeader from '@material-tailwind/react/ModalHeader'
import ModalBody from '@material-tailwind/react/ModalBody'
import PDefaultNotes from '../ui/text/PDefaultNotes'
import Textarea from '@material-tailwind/react/Textarea'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import { alertTimer } from '../../helpers/alerts'
import { useForm } from '../../hooks/useForm'

let today = new Date()
today = moment(today).format('yyyy-MM-DD')
let initialState = { inputEdit: '', inputAdd: '' }

function ActivityDetailScreen() {

  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)
  const { states: UiState, functions: UiFunc } = useContext(UiContext)
  const [{ inputEdit, inputAdd }, onChangeValues, reset] = useForm(initialState)
  const [{ idNote }, setNoteActive] = useState({ idNote: null })
  const [updateOrAdd, setUpdateOrAdd] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleBack = async () => {
    await UiFunc.setIsLoading(true)
    await ActFunc.getActivities()
    await UiFunc.setAllOrDetails(true)
    await UiFunc.detailsView(false, false)
  }

  const handleUpdatePriority = (id, priority) => {
    let data = { prioridad_numero: priority, id_actividad: id, }
    ActFunc.updatePriority(data, true, id)
  }

  const handleAddNewNote = () => {
    const data = { id_actividad: ActState.activityDetails.id_det, description: inputAdd }
    const action = () => {
      ActFunc.addNewNote(data, true, ActState.activityDetails.id_det)
      showModalFalse()
    }
    let state = inputAdd !== ''
    alertTimer(state, 'info', 1500, 'No puedes agregar una nota vacia') && action()
  }

  const handleUpdateNote = () => {
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

  const handleGetidNote = (idNote, description) => {
    reset()
    setNoteActive({ idNote, description })
    initialState.inputEdit = description
  }

  return (
    <>
      {
        ActState.activityDetails !== null &&
        <>
          <div className="container mx-auto">
            <div className="bg-white p-10 rounded-lg shadow-lg mt-20">
              <div className="flex items-center justify-between mb-10">
                <div className="text-2xl font-bold text-gray-700 capitalize">
                  <ButtonUnText
                    icon="fas fa-chevron-left"
                    styles="mr-7"
                    hoverBgColor='hover:bg-white'
                    color='text-black hover:text-blue-500'
                    onclick={handleBack} />
                  Detalle actividad: {ActState.activityDetails.id_det}, {ActState.activityDetails.actividad}
                </div>
                <div className="rounded-full p-1 bg-gray-100">
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
              <div className="grid grid-cols-3">
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
                  <Ptext tag="Dias transcurridos:" value={moment(ActState.activityDetails.fecha_tx).diff(today, 'days') - (moment(ActState.activityDetails.fecha_tx).diff(today, 'days') * 2)}
                  />
                  <div className="flex items-center">
                    <Ptext
                      tag="Prioridad:"
                      value={ActState.activityDetails.prioridad_etiqueta === 1000 ? 'Sin prioridad' : ActState.activityDetails.prioridad_etiqueta === 600 ? 'Prioridad baja' : ActState.activityDetails.prioridad_etiqueta === 400 ? 'Prioridad media' : ActState.activityDetails.prioridad_etiqueta === 100 && 'Prioridad alta'} />
                    <p className={`
                    ${ActState.activityDetails.prioridad_etiqueta === 1000 ? 'bg-gray-200' : ActState.activityDetails.prioridad_etiqueta === 600 ? ActState.userData.usuario.color_prioridad_baja : ActState.activityDetails.prioridad_etiqueta === 400 ? ActState.userData.usuario.color_prioridad_media : ActState.activityDetails.prioridad_etiqueta === 100 && ActState.userData.usuario.color_prioridad_alta} 
                    h-5 w-5 rounded-full ml-2`
                    }></p>
                  </div>
                  <Ptext tag="Prioridad RA:" value={ActState.activityDetails.num_prioridad} />
                </div>
                <div className="col-span-2 bg-gray-100 py-2 px-4 rounded-md border">
                  <div className="flex justify-between">
                    <Ptext tag="Informes Diarios (notas):" />
                    <div>
                      <ButtonUnText icon="fas fa-plus" onclick={showModalAddNote} />
                      <ButtonUnText icon="fas fa-pen" onclick={showModalUpdateNote} />
                    </div>
                  </div>
                  <div className="scroll-row-detail h-card-details">
                    <ul className="mt-1">
                      {ActState.activityDetails.notas.length > 0 ?
                        ActState.activityDetails.notas.map(obj => {
                          return (
                            <ListNote
                              key={obj.id_nota}
                              desc={obj.desc_nota}
                              date={obj.fecha_hora_crea}
                              user={obj.user_crea}
                              dateColor="text-white"
                              styleList="font-normal text-justify"
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
                  <p className="p-2 leading-tight text-justify">{ActState.activityDetails.func_objeto}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 mt-6">
                <Ptext tag="Opciones Registro de Avance: (sin funcionalidades por ahora)" />
                <div className="mt-4 grid grid-cols-4 gap-10 px-5">
                  <div className="col-span-1 border-r grid grid-cols-1 gap-2 pr-5 place-content-between">
                    <div>
                      <label className="text-xs">Proyecto:</label>
                      <Select placeholder="Seleccionar" />
                    </div>
                    <div>
                      <label className="text-xs">Sub Proyecto:</label>
                      <Select placeholder="Seleccionar" />
                    </div>
                    <div>
                      <label className="text-xs">Solicita:</label>
                      <Select placeholder="Seleccionar" />
                    </div>
                    <div>
                      <label className="text-xs">Encargado:</label>
                      <Select placeholder="Seleccionar" />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="flex mb-5 gap-5 justify-center">
                      <Input
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={true}
                        placeholder="Nᵒ prioridad"
                      />
                      <Input
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={true}
                        placeholder="Ticket"
                      />
                      <Input
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={true}
                        placeholder="Tiempo estimado"
                      />
                    </div>
                    <hr />
                    {/* <div className="grid grid-cols-4 mt-5">
              <PTimes user="RD" />
              <PTimes user="SA" />
              <PTimes user="IA" />
              <PTimes user="FM" />
            </div> */}
                  </div>
                </div>
              </div>
              <div className="mt-10 flex justify-end">
                <Button
                  color="green"
                  buttonType="filled"
                  size="regular"
                  rounded={true}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                >
                  Aplicar
                </Button>
              </div>
            </div>

            {/* container fin */}
          </div>

          <Modal size="regular" active={showModal} toggler={() => showModalFalse()}>
            <ModalHeader toggler={() => showModalFalse()}>
              {
                idNote !== null ? 'Editar Nota' : 'Agregar nueva nota'
              }
            </ModalHeader>
            <ModalBody>
              {
                updateOrAdd ?
                  (<div className="w-430">
                    <label className="text-xs">Mensajes predeterminados:</label>
                    <div className="py-3 pl-3 pr-1 mx-auto mt-1 mb-5 bg-gray-100 rounded-md">
                      <PDefaultNotes from={true} idAct={ActState.activityDetails.id_det} noteText="Inicializar actividad urgente" onclick={showModalFalse} updatePriority={true} />
                      <PDefaultNotes from={true} idAct={ActState.activityDetails.id_det} noteText="esperando respuesta de cliente" onclick={showModalFalse} />
                      <PDefaultNotes from={true} idAct={ActState.activityDetails.id_det} noteText="esperando actividad.." onclick={showModalFalse} />
                      <PDefaultNotes from={true} idAct={ActState.activityDetails.id_det} noteText="trabajando..." onclick={showModalFalse} />
                      <PDefaultNotes from={true} idAct={ActState.activityDetails.id_det} noteText="sin avance" onclick={showModalFalse} />
                      <PDefaultNotes from={true} idAct={ActState.activityDetails.id_det} noteText="en cola" onclick={showModalFalse} isSeparator={false} />
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
                        ActState.activityDetails.notas.map(obj => {
                          if (ActState.activityDetails.id_det === obj.id_det) {
                            return (
                              <ListNote
                                isModal={true}
                                key={obj.id_nota}
                                idNote={obj.id_nota}
                                desc={obj.desc_nota}
                                date={obj.fecha_hora_crea}
                                user={obj.user_crea}
                                idActivity={ActState.activityDetails.id_det}
                                dateColor="text-white"
                                onclick={handleGetidNote}
                                activeColor={idNote === obj.id_nota ? 'text-green-600' : 'text-gray-500'}
                              />
                            )
                          } else {
                            return 'No hay notas...'
                          }
                        })
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
                {idNote !== null ? (updateOrAdd ? 'Agregar' : 'Editar') : 'Agregar'}
              </Button>
            </ModalFooter>
          </Modal>
        </>
      }
    </>
  )
}

export default ActivityDetailScreen
