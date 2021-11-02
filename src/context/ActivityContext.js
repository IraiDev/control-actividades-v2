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
  const [activityDetails, setActivityDetails] = useState(null)
  const [infoTimes, setInfoTimes] = useState([])
  // const [totals, setTotals] = useState([])

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
        label: 'Todas',
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
        label: 'Todas',
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

      arraySubProject = body.subproyectos.map(item => {
        return {
          label: item.nombre_sub_proy,
          value: item.id_sub_proyecto,
          name: 'subProy',
          id: item.id_proyecto
        }
      })

      arrayUsersE = body.usuarios.map(item => {
        return {
          label: item.abrev_user,
          value: item.abrev_user,
          name: 'encargado',
        }
      })

      arrayUsersS = body.usuarios.map(item => {
        return {
          label: item.abrev_user,
          value: item.abrev_user,
          name: 'solicitante',
        }
      })
    } else {
      normalAlert('warning', 'Error al obtener los filtros', 'Entiendo...')
    }
  }

  const getActivities = async (filtersParam = '') => {

    let data = {}

    if (filtersParam !== 'nada') {
      data = {
        encargado: UiState.multiEncargados,
        solicitante: UiState.multiSolicitantes,
        proyecto: UiState.multiProyectos,
        subProy: UiState.multiSubProyectos
      }
    }
    else {
      data = {
        encargado: [],
        solicitante: [],
        proyecto: [],
        subProy: []
      }
    }

    try {
      let filters = filtersParam === '' ? UiState.filters : filtersParam
      const resp = await fetchToken(`task/get-task-ra?${filters}`, data, 'POST')
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

  const getActivityDetail = async (idActivity) => {

    const filters = `id_actividad=${idActivity}`

    const data = {
      encargado: [],
      solicitante: [],
      proyecto: [],
      subProy: []
    }

    const resp = await fetchToken(`task/get-task-ra?${filters}`, data, 'POST')
    const body = await resp.json()

    if (body.ok) {
      setActivityDetails(body.tareas[0])
    }
    else {
      normalAlert('info', 'Error al obtener detalle de actividad', 'Entiendo...')
    }
    UiFunc.setIsLoading(false)
  }

  const getInfoTimes = async (param) => {
    const resp = await fetchToken(`times/get-times-info?${param}`)
    const body = await resp.json()


    let tempProy = '', arrayNewTimes = []
    // let arrayTotalTimes = [], data = {}

    if (body.ok) {
      body.msg[0].forEach(item => {

        item.usuarios.forEach(item2 => {

          let validation1 = item2.tiempos.mc === '0,0' && item2.tiempos.d5c === '0,0' && item2.tiempos.d3c === '0,0' && item2.tiempos.d1c === '0,0'
          let validation2 = item2.tiempos.mnc === '0,0' && item2.tiempos.d5nc === '0,0' && item2.tiempos.d3nc === '0,0' && item2.tiempos.d1nc === '0,0'


          if (validation1 && validation2) {
          } else {
            if (item.proy !== tempProy) {
              tempProy = item.proy
              arrayNewTimes.push(item)

              // calculo de total en frontend
              // item.usuarios.forEach(user => {

              //   let mcTotal = 0, d1cTotal = 0, d3cTotal = 0, d5cTotal = 0
              //   let mncTotal = 0, d1ncTotal = 0, d3ncTotal = 0, d5ncTotal = 0

              //   let mcDot = user.tiempos.mc.replace(',', '.')
              //   let mc = parseFloat(mcDot)
              //   let d1cDot = user.tiempos.d1c.replace(',', '.')
              //   let d1c = parseFloat(d1cDot)
              //   let d3cDot = user.tiempos.d3c.replace(',', '.')
              //   let d3c = parseFloat(d3cDot)
              //   let d5cDot = user.tiempos.d5c.replace(',', '.')
              //   let d5c = parseFloat(d5cDot)

              //   let mncDot = user.tiempos.mnc.replace(',', '.')
              //   let mnc = parseFloat(mncDot)
              //   let d1ncDot = user.tiempos.d1nc.replace(',', '.')
              //   let d1nc = parseFloat(d1ncDot)
              //   let d3ncDot = user.tiempos.d3nc.replace(',', '.')
              //   let d3nc = parseFloat(d3ncDot)
              //   let d5ncDot = user.tiempos.d5nc.replace(',', '.')
              //   let d5nc = parseFloat(d5ncDot)

              //   mcTotal = mcTotal + mc
              //   d1cTotal = d1cTotal + d1c
              //   d3cTotal = d3cTotal + d3c
              //   d5cTotal = d5cTotal + d5c

              //   mncTotal = mncTotal + mnc
              //   d1ncTotal = d1ncTotal + d1nc
              //   d3ncTotal = d3ncTotal + d3nc
              //   d5ncTotal = d5ncTotal + d5nc

              //   data = {
              //     usuario: user.usuario,
              //     tiempos: {
              //       d1c: d1cTotal,
              //       d1nc: d1ncTotal,
              //       d3c: d3cTotal,
              //       d3nc: d3ncTotal,
              //       d5c: d5cTotal,
              //       d5nc: d5ncTotal,
              //       mc: mcTotal,
              //       mnc: mncTotal
              //     }
              //   }

              //   let index = arrayTotalTimes.findIndex(i => i.usuario === user.usuario);

              //   if (index >= 0) {
              //     arrayTotalTimes[index].tiempos.d1c += d1c
              //     arrayTotalTimes[index].tiempos.d3c += d3c
              //     arrayTotalTimes[index].tiempos.d5c += d5c
              //     arrayTotalTimes[index].tiempos.mc += mc
              //     arrayTotalTimes[index].tiempos.d1nc += d1nc
              //     arrayTotalTimes[index].tiempos.d3nc += d3nc
              //     arrayTotalTimes[index].tiempos.d5nc += d5nc
              //     arrayTotalTimes[index].tiempos.mnc += mnc
              //     arrayTotalTimes[index].usuario = user.usuario
              //   }
              //   else {
              //     arrayTotalTimes.push(data)
              //   }
              // })
            }
          }
        })
      })
      // setTotals(arrayTotalTimes)
      setInfoTimes(arrayNewTimes)
    }
    else {
      normalAlert('warning', 'Error al obtener informe de tiempos', 'Entiendo...')
    }
    UiFunc.setIsLoading(false)
  }

  const updatePriority = async (data, from = false, idActivity) => {
    UiFunc.setIsLoading(true)
    const resp = await fetchToken('task/update-priority', data, 'POST')
    const body = await resp.json()
    body.ok ? from ? getActivityDetail(idActivity) : getActivities() :
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

  const addNewNote = async (data, from = false, idActivity) => {
    UiFunc.setIsLoading(true)
    const resp = await fetchToken('task/create-note', data, 'POST')
    const body = await resp.json()
    console.log(body)
    body.ok ? from ? getActivityDetail(idActivity) : getActivities() :
      normalAlert('warning', 'Error al crear la nota', 'Entiendo...')
  }

  const updateNote = async (data, from = false, idActivity) => {
    UiFunc.setIsLoading(true)
    const resp = await fetchToken('task/update-note', data, 'PUT')
    const body = await resp.json()
    body.ok ? from ? getActivityDetail(idActivity) : getActivities() :
      normalAlert('warning', 'Error al actualizar la nota', 'Entiendo...')
  }

  const deleteNote = async (data, from = false, idActivity) => {
    UiFunc.setIsLoading(true)
    const resp = await fetchToken('task/delete-note', data, 'DELETE')
    const body = await resp.json()
    body.ok ? from ? getActivityDetail(idActivity) : getActivities() :
      normalAlert('warning', 'Error al eliminar la nota', 'Entiendo...')
  }

  const addTaskToRA = async (data) => {
    const resp = await fetchToken('task/add-task-todo', data, 'POST')
    const body = await resp.json()
    if (body.ok) {
      alertTimer(false, 'info', 1500, 'Tarea agregada correctamente al RA')
      return true
    } else {
      if (data.description === '') {
        normalAlert('warning', 'La tarea debe tener una descripcion para ser agregada al RA', 'Entiendo...')
      } else {
        normalAlert('warning', 'El ID de la tarea ya exsite en el RA', 'Entiendo...')
      }
      return false
    }
  }

  const markNotifications = async (data) => {
    const resp = await fetchToken('task/update-notification', data, 'POST')
    const body = await resp.json()

    if (body.ok) {
      getNotify()
    }
    else {
      normalAlert('warning', 'Error al marcar las notificaciones', 'Entiendo...')
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
      infoTimes,
      activityDetails
      // totals
    },
    functions: {
      login,
      logout,
      getTimes,
      getNotify,
      getActivities,
      getActivityDetail,
      updatePriority,
      updateUserColors,
      addNewNote,
      updateNote,
      deleteNote,
      addTaskToRA,
      getFilters,
      getInfoTimes,
      markNotifications,
    }
  }
  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  )
}

export default ActivityProvider
