import React from 'react'
import ButtonUnText from '../buttons/ButtonUnText'

function ListDocs({ id, name }) {
  return (
    <li
      key={id}
      className="bg-gray-100 p-1 hover:shadow-md mb-1 rounded-md pl-2 text-transparent transition duration-500 mx-auto hover:text-blue-500 flex items-center leading-5 w-max col-span-1"
    >
      <a className="text-gray-500" href="/" rel="noreferrer" target="_blank">{name}</a>
      <ButtonUnText icon="fas fa-times" hoverBgColor="" color="hover:text-red-500" styles="w-4 ml-2" />
    </li>
  )
}

export default ListDocs