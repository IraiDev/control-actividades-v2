import React, { createContext, useContext, useState } from 'react'
import { UiContext } from './UiContext';
import { deleteFetch, getDetailsFetch, getFetch, postFetch, updateFetch } from '../helpers/fetchingGraph';

export const GraphContext = createContext()

function GraphProvider({ children }) {
  const [userEmail, setUserEmail] = useState(null)
  const [plannerTask, setPlannerTask] = useState([])
  const [todoTask, setTodoTask] = useState([])
  const [todoList, setTodoList] = useState([])
  const [idListSelected, setIdListSelected] = useState(null)
  const { functions: UiFunc } = useContext(UiContext)

  //funciones api microsoft graph

  const getUserData = async () => {
    await getFetch('/me/').then(resp => {
      setUserEmail(resp.mail)
    })
  }

  const getPlannerTask = async () => {
    await getFetch('/me/planner/tasks', '', 'details')
      .then(resp => {
        // getDetailsFetchs()
        // const { value } = resp
        // console.log(value[0])
        setPlannerTask(resp.value)
      })
    UiFunc.setIsLoading(false)
  }

  const getDetailsFetchs = async () => {
    await getDetailsFetch('/planner/tasks/f9txACXNXU67Ke0qifLnsGUAJCSf/details')
      .then(resp => {
        console.log(resp)
      })
  }

  // c0855abb-afb6-4adf-9c65-d05d2f43118b id grupo
  // zionitcl254.sharepoint.com,b39fd2c3-4d71-4d00-934b-a8cb97f494fa,26cfd7fb-52a9-434b-ba56-e4ac1e40da24 id site

  const getTodoTask = async (idList) => {
    const endPoint = `/me/todo/lists/${idList}/tasks`
    await getFetch(endPoint)
      .then(resp => setTodoTask(resp.value))
    UiFunc.setIsLoading(false)
  }

  const createTodo = async (idList, data) => {
    UiFunc.setIsLoading(true)
    const endPoint = `todo/lists/${idList}/tasks`
    await postFetch(endPoint, data)
    getTodoTask(idListSelected)
  }

  const updateTodo = async (idList, idTodo, data) => {
    UiFunc.setIsLoading(true)
    const endPoint = `todo/lists/${idList}/tasks/${idTodo}`
    await updateFetch(endPoint, data)
    getTodoTask(idListSelected)
  }

  const deleteTodo = async (idList, idTodo) => {
    UiFunc.setIsLoading(true)
    const endPoint = `todo/lists/${idList}/tasks/${idTodo}`
    await deleteFetch(endPoint)
    getTodoTask(idListSelected)
  }

  const getTodoList = async () => {
    await getFetch('/me/todo/lists')
      .then(resp => setTodoList(resp.value))
    UiFunc.setIsLoading(false)
  }

  const createTodoList = async (data) => {
    UiFunc.setIsLoading(true)
    await postFetch('todo/lists', data)
    getTodoList()
  }

  const updateTodoList = async (idList, data) => {
    UiFunc.setIsLoading(true)
    const endPoint = `todo/lists/${idList}`
    await updateFetch(endPoint, data)
    getTodoList()
  }

  const deleteTodoList = async (idList) => {
    UiFunc.setIsLoading(true)
    const endPoint = `todo/lists/${idList}`
    await deleteFetch(endPoint)
    getTodoList()
  }

  // vaariables de contexto globa

  const value = {
    states: {
      userEmail,
      plannerTask,
      todoTask,
      todoList,
      idListSelected,
    },
    functions: {
      getUserData,
      getPlannerTask,
      getTodoList,
      createTodoList,
      updateTodoList,
      deleteTodoList,
      getTodoTask,
      createTodo,
      updateTodo,
      deleteTodo,
      setIdListSelected,
    }
  }
  return (
    <GraphContext.Provider value={value}>
      {children}
    </GraphContext.Provider>
  )
}

export default GraphProvider
