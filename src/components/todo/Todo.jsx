import React, { useContext, useState } from 'react'
import { UiContext } from '../../context/UiContext'
import { GraphContext } from '../../context/GraphContext'
import { useForm } from '../../hooks/useForm'
import TodoCard from './TodoCard'
import Modal from '../ui/modal/Modal'
import Input from '../ui/inputs/Input'
import Button from '../ui/buttons/Button'
import TextArea from '../ui/inputs/TextArea'
import TextContent from '../ui/text/TextContent'
import Tippy from '@tippyjs/react'
import { Alert } from '../../helpers/alert'

function Todo() {
  const [{ input, textArea }, onChangeValues, reset] = useForm({ input: '', textArea: '' })
  const { states: GraphState, functions: GraphFunc } = useContext(GraphContext)
  const { states: UiState } = useContext(UiContext)
  const [showModal, setShowModal] = useState(false)
  const [check, setCheck] = useState(false)
  const [important, setImportant] = useState(false)
  const [showImportant, setShowImportant] = useState('normal')

  const handleCreateTodo = () => {
    if (input === '' || textArea === '') {
      Alert({
        icon: 'warn',
        title: 'Atencion',
        content: 'No puedes crear un to-do sin titulo o descripcion',
        showCancelButton: false,
        timer: 5000
      })
      return
    }
    const data = {
      title: input,
      importance: check ? 'high' : 'normal',
      body: {
        content: textArea,
      }
    }
    GraphFunc.createTodo(GraphState.idListSelected, data)
    setShowModal(false)
    reset()
  }

  const showModalFalse = () => {
    setShowModal(false)
    setCheck(false)
    reset()
  }

  const onChangeImportance = () => {
    setImportant(!important)
    if (important) {
      setShowImportant('normal')
    }
    else {
      setShowImportant('high')
    }
  }

  return (
    <>
      <div className="bg-white mb-5 p-4 rounded-md shadow-md mt-1 flex justify-between items-center text-sm w-full">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-lg text-gray-600 hidden sm:inline"><i className={`${UiState.displayNameTodoList.icon} mr-2`}></i>{UiState.displayNameTodoList.title}</p>
          <Tippy
            offset={[0, 10]}
            delay={[700, 0]}
            placement="bottom"
            content={<span>{check ? 'Quitar importante' : 'Asignar como importante'}</span>}
          >
            <label htmlFor="importance">
              <input
                className="hidden"
                type="checkbox"
                id="importance"
                checked={important}
                onChange={() => onChangeImportance()} />
              <i className={`transition duration-500 cursor-pointer fa-lg hover:text-blue-400 ${important ? 'fas fa-star text-blue-500' : 'far fa-star'}`}></i>
            </label>
          </Tippy>
        </div>
        <Button
          className="text-blue-500 font-semibold border-2 border-blue-500 rounded-full hover:text-white hover:bg-blue-500"
          name="Agregar to-do"
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-5 gap-3">
        {
          GraphState.todoTask.length > 0 ?
            (
              GraphState.todoTask.map(obj => {
                if (obj.importance === showImportant) {
                  return (
                    <TodoCard
                      key={obj.id}
                      title={obj.title}
                      desc={obj.body.content}
                      idTodo={obj.id}
                      importance={obj.importance}
                    />
                  )
                }
                else {
                  if (showImportant === 'normal') {
                    if (obj.importance === 'high') {
                      return (
                        <TodoCard
                          key={obj.id}
                          title={obj.title}
                          desc={obj.body.content}
                          idTodo={obj.id}
                          importance={obj.importance}
                        />
                      )
                    } else { return null }
                  } else { return null }
                }
              })
            ) : (<TextContent className="text-center col-span-12" type="response" value="No hay to-dos" />)
        }
      </div>

      {/* modal create todo */}

      <Modal showModal={showModal} onClose={showModalFalse} className="max-w-xl">
        <div className="flex items-center mb-5 gap-5">
          <h1 className="text-xl font-semibold">Crear To-do</h1>
          <Tippy
            offset={[0, 10]}
            delay={[700, 0]}
            placement="bottom"
            content={<span>{check ? 'Quitar importante' : 'Asignar como importante'}</span>}
          >
            <label htmlFor="important">
              <input
                className="hidden"
                type="checkbox"
                id="important"
                checked={check}
                onChange={() => setCheck(!check)} />
              <i className={`transition duration-500 cursor-pointer hover:text-blue-400 fa-lg ${check ? 'fas fa-star text-blue-500' : 'far fa-star'}`}></i>
            </label>
          </Tippy>
        </div>
        <div className="w-full">
          <Input
            field="Titulo"
            type="text"
            name="input"
            value={input}
            onChange={onChangeValues} />
          <br />
          <TextArea
            field="descripcion"
            value={textArea}
            name="textArea"
            onChange={onChangeValues} />
        </div>
        <br />
        <div className="flex justify-end">
          <Button
            className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-full font-semibold"
            name="Crear"
            onClick={() => handleCreateTodo()}
          />
        </div>
      </Modal>
    </>
  )
}

export default Todo
