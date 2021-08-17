import React, { createContext, useState } from 'react'
import { normalAlert } from '../helpers/alerts'
import { fetchToken } from '../helpers/fetch'

export const ActivityContext = createContext()

function ActivityProvider({ children }) {
  const [userData, setUserData] = useState({})
  const [usersTimes, setUsersTimes] = useState([])
  const [userNotify, setUserNotify] = useState([])
  const [activitiesRA, setActivitiesRA] = useState([])

  // Login y logout  functions
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

  // obtener notificaciones
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
    }
  }
  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  )
}

export default ActivityProvider
