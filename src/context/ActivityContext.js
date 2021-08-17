import React, { createContext, useState } from 'react'
import { alertTimer, normalAlert } from '../helpers/alerts'
import { fetchToken } from '../helpers/fetch'

export const ActivityContext = createContext()

function ActivityProvider({ children }) {
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
        console.log("Body de login resp: ", body)
      } else {
        normalAlert('warning', `<p><b>Atencion: </b>${body.msg}</p>`, 'Entiendo')
      }
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

  const getActivities = async (filters) => {
    try {
      const resp = await fetchToken(`task/get-task-ra?${filters}`)
      const body = await resp.json()
      body.ok ? setActivitiesRA(body.tareas) :
        normalAlert('warning', 'Error al cargar las activiades del RA', 'Entiendo...')
    } catch (error) {
      console.log(error)
    }
  }

  const updatePriority = async (data) => {
    const resp = await fetchToken('task/update-priority', data, 'POST')
    const body = await resp.json()
    body.ok ? getActivities() :
      normalAlert('warning', 'Error al actualizar la prioridad de la actividad', 'Entiendo...')
  }

  const updateUserColors = async (data) => {
    const resp = await fetchToken('task/update-priority', data, 'PUT')
    const body = resp.json()
    body.ok ? getActivities() :
      normalAlert('warning', 'Error al actualizar color de prioridad ToDO', 'Entiendo...')
  }

  const addNewNote = async (data) => {
    const resp = await fetchToken('task/create-note', data, 'POST')
    const body = await resp.json()
    body.ok ? getActivities() :
      normalAlert('warning', 'Error al crear la nota', 'Entiendo...')
  }

  const updateNote = async (data) => {
    const resp = await fetchToken('task/update-note', data, 'PUT')
    const body = await resp.json()
    body.ok ? getActivities() :
      normalAlert('warning', 'Error al actualizar la nota', 'Entiendo...')
  }

  const deleteNote = async (data) => {
    const resp = await fetchToken('task/delete-note', data, 'DELETE')
    const body = await resp.json()
    body.ok ? getActivities() :
      normalAlert('warning', 'Error al eliminar la nota', 'Entiendo...')
  }

  const getFilters = async () => {
    const resp = await fetchToken('task/get-filters')
    const body = await resp.json()
    if (body.ok) {
      console.log(body)
    }
  }

  const addTaskToRA = async (data) => {
    const resp = await fetchToken('task/add-task-todo', data, 'POST')
    const body = await resp.json()
    if (body.ok) {
      await getActivities()
      alertTimer(true, 'info', 1500, 'Tarea agregada correctamente al RA')
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
