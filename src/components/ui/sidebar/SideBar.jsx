import React, { useContext } from 'react'
import { UiContext } from '../../../context/UiContext'
import ButtonText from '../buttons/ButtonText'
import InputFilter from '../inputs/InputFilter'
import InputFilterNumber from '../inputs/InputFilterNumber'
import SelectFilter from '../select/SelectFilter'

let style = "bg-white shadow-xl w-430 pt-4 px-8 h-screen animate__animated animate__faster z-30 fixed"

function SideBar() {
  const { states, functions } = useContext(UiContext)

  const handleClick = () => {
    functions.setToggleSideBar()
  }

  return (
    <div
      className={states.toggleSideBar ? `${style} animate__slideInLeft` : `${style} animate__slideOutLeft`}>
      <div className="flex justify-between mb-6">
        <h1 className="mb-4 text-xl">Filtros:</h1>
        <button
          className="focus:outline-none active:outline-none"
          onClick={() => {
            handleClick();
          }}
        >
          <i className="px-2 pt-0 text-gray-600 fas fa-times fa-lg"></i>
        </button>
      </div>
      <div className="mb-10 h-700 scroll-row-side-bar">
        <InputFilterNumber type="text" label="ID" placeholder="Filtrar por ID..." />
        <InputFilter type="text" label="Actividad" placeholder="Filtrar por actividad..." />
        <InputFilter type="text" label="Actividad" placeholder="Filtrar por actividad..." />
        <InputFilterNumber type="text" label="ID" placeholder="Filtrar por ID..." />

        <SelectFilter id="enc123" width="w-60" label="Encargado" />
        <SelectFilter id="qwe" width="w-60" label="Encargado" />
        <SelectFilter id="encqweqwe123" width="w-60" label="Encargado" />
        <SelectFilter id="enc1sd23" width="w-60" label="Encargado" />
        <SelectFilter id="enc121323" width="w-60" label="Encargado" />
        <SelectFilter id="enc1dfg23" width="w-60" label="Encargado" />
      </div>

      <div className="flex justify-end mt-2">
        <ButtonText
          icon="fas fa-filter fa-sm"
          text="Limpiar"
          onclick={handleClick} />
        <ButtonText
          icon="fas fa-filter fa-sm"
          text="Filtrar"
          color="ml-2 bg-blue-500 hover:bg-blue-600 text-white"
          onclick={handleClick} />
      </div>
    </div>
  )
}

export default SideBar
