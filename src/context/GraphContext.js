import React, { createContext, useState } from 'react'
import { deleteFetch, getFetch, postFetch, updateFetch } from '../helpers/fetchingGraph';

export const GraphContext = createContext()

function GraphProvider({ children }) {
  const [userEmail, setUserEmail] = useState(null)
  const [plannerTask, setPlannerTask] = useState([])
  const [todoTask, setTodoTask] = useState([])
  const [todoList, settodoList] = useState([])
  const [idListSelected, setIdListSelected] = useState(null)

  //funciones api microsoft graph

  const getUserData = async () => {
    await getFetch().then(resp => setUserEmail(resp.mail))
  }

  const getPlannerTask = async () => {
    await getFetch('/me/planner/tasks', '', 'details')
      .then(resp => setPlannerTask(resp.value))
  }

  const getTodoTask = async (idList) => {
    const endPoint = `/me/todo/lists/${idList}/tasks`
    await getFetch(endPoint)
      .then(resp => setTodoTask(resp.value))
  }

  const createTodo = async (idList, data) => {
    const endPoint = `todo/lists/${idList}/tasks`
    await postFetch(endPoint, data)
    getTodoTask(idListSelected)
  }

  const updateTodo = async (idList, idTodo, data) => {
    const endPoint = `todo/lists/${idList}/tasks/${idTodo}`
    await updateFetch(endPoint, data)
    getTodoTask(idListSelected)
  }

  const deleteTodo = async (idList, idTodo) => {
    const endPoint = `todo/lists/${idList}/tasks/${idTodo}`
    await deleteFetch(endPoint)
    getTodoTask(idListSelected)
  }

  const getTodoList = async () => {
    await getFetch('/me/todo/lists')
      .then(resp => settodoList(resp.value))
  }

  const createTodoList = async (data) => {
    await postFetch('todo/lists', data)
  }

  const updateTodoList = async (idList, data) => {
    const endPoint = `todo/lists/${idList}`
    await updateFetch(endPoint, data)
  }

  const deleteTodoList = async (idList) => {
    const endPoint = `todo/lists/${idList}`
    await deleteFetch(endPoint)
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
