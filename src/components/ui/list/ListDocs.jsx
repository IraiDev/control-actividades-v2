import React from 'react'
import { alertQuest } from '../../../helpers/alerts'
import Button from '../buttons/Button'

function ListDocs({ id, name }) {

  const handleDelete = () => {
    const action = () => {
      console.log('se elimino fake');
    }
    alertQuest('info', `¿Esta seguro de eliminar el siguiente archivo <b>${name}</b>?`, 'No Cancelar', 'Si, eliminar', action)
  }

  return (
    <li
      key={id}
      className="flex-auto w-full bg-gray-100 p-3 hover:shadow-md hover:text-blue-500 border border-transparent hover:border-gray-400 rounded-md pl-2 text-transparent transition duration-500 mx-auto flex justify-between items-center leading-5 col-span-1"
    >
      <a className="text-gray-500 hover:text-blue-500 truncate" href="/" rel="noreferrer" target="_blank"><i className="fas fa-file mx-2"></i>{name}</a>
      <Button
        className="w-4 ml-2 hover:text-red-500"
        type="icon"
        icon="fas fa-trash-alt"
        onClick={handleDelete} />
    </li>
  )
}

export default ListDocs