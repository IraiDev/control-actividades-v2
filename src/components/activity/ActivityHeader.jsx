import React from 'react'
import Button from '../ui/buttons/Button'

function ActivityHeader({ onClick, active }) {
  return (
    <div className="grid grid-cols-12 shadow-md rounded-md font-semibold text-white min-w-table sticky top-0">
      <div className="bg-gray-500 hover:bg-gray-700 rounded-l-md px-2 py-5 transition duration-500 col-span-1">ID</div>
      <div className="bg-gray-600 hover:bg-gray-800 px-2 py-5 transition duration-500 col-span-1">Ticket</div>
      <div className="bg-gray-500 hover:bg-gray-700 px-2 py-5 transition duration-500 col-span-1">Proyecto</div>
      <div className="bg-gray-600 hover:bg-gray-800 px-2 py-5 transition duration-500 col-span-1">SubProy.</div>
      <div className="bg-gray-500 hover:bg-gray-700 px-2 py-2 transition duration-500 col-span-1">
        Solicitante
        <span className="block text-xs font-normal">(Fecha)</span>
      </div>
      <div className="bg-gray-600 hover:bg-gray-800 px-2 py-5 transition duration-500 col-span-1">Encargado</div>
      <div className="bg-gray-500 hover:bg-gray-700 px-2 py-5 transition duration-500 col-span-1">Actividad</div>
      <div className="bg-gray-600 hover:bg-gray-800 px-2 py-3 transition duration-500 col-span-3">
        Descripcion
        <Button
          className="ml-2"
          type="icon"
          icon={active ? 'fas fa-angle-up' : 'fas fa-angle-down'}
          tippyText={active ? 'Ocultar' : 'Mostrar'}
          onClick={onClick} />
      </div>
      <div className="bg-gray-500 hover:bg-gray-700 px-2 py-5 transition duration-500 col-span-1">Estado</div>
      <div className="bg-gray-600 hover:bg-gray-800 rounded-r-md px-2 py-5 transition duration-500 col-span-1">Acciones</div>
    </div>
  )
}

export default ActivityHeader
