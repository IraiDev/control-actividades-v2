import React, { createContext, useContext, useState } from 'react'
import { UiContext } from './UiContext';
import { deleteFetch, getFetch, postFetch, updateFetch } from '../helpers/fetchingGraph';

export const GraphContext = createContext()

function GraphProvider({ children }) {
  const [userEmail, setUserEmail] = useState(null)
  const [plannerTask, setPlannerTask] = useState([])
  const [todoTask, setTodoTask] = useState([])
  const [todoList, settodoList] = useState([])
  const [idListSelected, setIdListSelected] = useState(null)
  const { functions: UiFunc } = useContext(UiContext)

  //funciones api microsoft graph

  const getUserData = async () => {
    await getFetch('/me/').then(resp => setUserEmail(resp.mail))
  }

  const getPlannerTask = async () => {
    await getFetch('/me/planner/tasks', '', 'details')
      .then(resp => setPlannerTask(resp.value))
    UiFunc.setIsLoading(false)
  }

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
      .then(resp => settodoList(resp.value))
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