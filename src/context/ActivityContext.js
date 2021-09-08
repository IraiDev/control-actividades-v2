import React, { createContext, useContext, useState } from 'react'
import { UiContext } from './UiContext'
import { alertTimer, normalAlert } from '../helpers/alerts'
import { fetchToken } from '../helpers/fetch'

export const ActivityContext = createContext()

let arrayState = []
let arrayPriority = []
let arrayProject = []
let arraySubProject = []
let arrayUsersE = []
let arrayUsersS = []

function ActivityProvider({ children }) {
  const { states: UiState, functions: UiFunc } = useContext(UiContext)
  const [userData, setUserData] = useState({})
  const [usersTimes, setUsersTimes] = useState([])
  const [userNotify, setUserNotify] = useState([])
  const [activitiesRA, setActivitiesRA] = useState([])

  const login = async (email) => {
    try {
      const resp = await fetchToken('auth/login', { email }, 'POST')
      const body = await resp.json()

      if (body.ok) {
        localStorage.setItem('tokenBackend', body.token)
        setUserData(body)
      } else {
        normalAlert('warning', `<p><b>Atencion: </b>${body.msg}</p>`, 'Entiendo')
      }
      UiFunc.setIsLoading(false)
    } catch (error) {
      console.log("login error: ", error)
    }
  }

  const logout = () => {
    localStorage.removeItem('tokenBackend')
  }

  // obtener tiempos de los usuarios en play (detenciones en RA)
  const getTimes = async () => {
    try {

      const resp = await fetchToken('task/get-times')
      const body = await resp.json()

      body.ok ? setUsersTimes(body.tiempos) : normalAlert('warning', 'error tiempos', 'Entiendo')

    } catch (error) {
      console.log("getTimes error: ", error)
    }
  }

  const getNotify = async () => {
    try {

      const resp = await fetchToken('task/get-notifications')
      const body = await resp.json()

      body.ok ? setUserNotify(body.notificaciones) :
        normalAlert('warning', 'Error al obtener las notificaciones', 'Entiendo')

    } catch (error) {
      console.log(error)
    }
  }

  const getFilters = async () => {
    const resp = await fetchToken('task/get-filters')
    const body = await resp.json()
    if (body.ok) {

      arrayState = body.estados.map(item => {
        return {
          label: item.desc_estado,
          value: item.id_estado,
          name: 'estado',
        }
      })
      arrayState.unshift({
        label: 'Todas las opciones',
        value: '',
        name: 'estado',
      })

      arrayPriority = body.prioridades.map(item => {
        return {
          label: item.nombre,
          value: item.color,
          name: 'color',
        }
      })
      arrayPriority.unshift({
        label: 'Todas las opciones',
        value: '',
        name: 'color',
      })

      arrayProject = body.proyectos.map(item => {
        return {
          label: item.abrev,
          value: item.id_proy,
          name: 'proyecto',
          id: item.id_proy
        }
      })
      arrayProject.unshift({
        label: 'Todas las opciones',
        value: '',
        name: 'proyecto',
      })

      arraySubProject = body.subproyectos.map(item => {
        return {
          label: item.nombre_sub_proy,
          value: item.id_sub_proyecto,
          name: 'subProy',
          id: item.id_proyecto
        }
      })
      arraySubProject.unshift({
        label: 'Todas las opciones',
        value: '',
        name: 'subProy',
      })

      arrayUsersE = body.usuarios.map(item => {
        return {
          label: item.abrev_user,
          value: item.abrev_user,
          name: 'encargado',
        }
      })
      arrayUsersE.unshift({
        label: 'Todas las opciones',
        value: '',
        name: 'encargado',
      })

      arrayUsersS = body.usuarios.map(item => {
        return {
          label: item.abrev_user,
          value: item.abrev_user,
          name: 'solicitante',
        }
      })
      arrayUsersS.unshift({
        label: 'Todas las opciones',
        value: '',
        name: 'solicitante',
      })
    } else {
      normalAlert('warning', 'Error al obtener los filtros', 'Entiendo...')
    }
  }

  const getActivities = async (filtersParam = '') => {
    try {
      let filters = filtersParam === '' ? UiState.filters : filtersParam
      const resp = await fetchToken(`task/get-task-ra?${filters}`)
      const body = await resp.json()
      if (body.ok) {
        setActivitiesRA(body.tareas)
      } else {
        normalAlert('warning', 'Error al cargar las activiades del RA', 'Entiendo...')
      }
      UiFunc.setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const updatePriority = async (data) => {
    UiFunc.setIsLoading(true)
    const resp = await fetchToken('task/update-priority', data, 'POST')
    const body = await resp.json()
    body.ok ? getActivities() :
      normalAlert('warning', 'Error al actualizar la prioridad de la actividad', 'Entiendo...')
  }

  const updateUserColors = async (data) => {
    UiFunc.setIsLoading(true)
    const userEmail = userData.usuario.email
    const resp = await fetchToken('user/update-priority', data, 'PUT')
    const body = await resp.json()
    body.ok ? login(userEmail) :
      normalAlert('warning', 'Error al actualizar color de prioridad ToDO', 'Entiendo...')
  }

  const addNewNote = async (data) => {
    UiFunc.setIsLoading(true)
    const resp = await fetchToken('task/create-note', data, 'POST')
    const body = await resp.json()
    body.ok ? getActivities() :
      normalAlert('warning', 'Error al crear la nota', 'Entiendo...')
  }

  const updateNote = async (data) => {
    UiFunc.setIsLoading(true)
    const resp = await fetchToken('task/update-note', data, 'PUT')
    const body = await resp.json()
    body.ok ? getActivities() :
      normalAlert('warning', 'Error al actualizar la nota', 'Entiendo...')
  }

  const deleteNote = async (data) => {
    UiFunc.setIsLoading(true)
    const resp = await fetchToken('task/delete-note', data, 'DELETE')
    const body = await resp.json()
    body.ok ? getActivities() :
      normalAlert('warning', 'Error al eliminar la nota', 'Entiendo...')
  }

  const addTaskToRA = async (data) => {
    const resp = await fetchToken('task/add-task-todo', data, 'POST')
    const body = await resp.json()
    if (body.ok) {
      alertTimer(false, 'info', 1500, 'Tarea agregada correctamente al RA')
      return
    } else {
      if (data.desc === '') {
        normalAlert('warning', 'La tarea debe tener una descripcion para ser agregada al RA', 'Entiendo...')
      } else {
        normalAlert('warning', 'El ID de la tarea ya exsite en el RA', 'Entiendo...')
      }
    }
  }

  const value = {
    states: {
      userData,
      usersTimes,
      userNotify,
      activitiesRA,
      arrayUsersE,
      arrayUsersS,
      arraySubProject,
      arrayProject,
      arrayPriority,
      arrayState,
    },
    functions: {
      login,
      logout,
      getTimes,
      getNotify,
      getActivities,
      updatePriority,
      updateUserColors,
      addNewNote,
      updateNote,
      deleteNote,
      addTaskToRA,
      getFilters
    }
  }
  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  )
}

export default ActivityProvider
