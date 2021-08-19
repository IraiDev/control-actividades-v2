import React, { useContext } from 'react'
import { UiContext } from '../../../context/UiContext'
import { ActivityContext } from '../../../context/ActivityContext'
import ButtonText from '../buttons/ButtonText'
import InputFilter from '../inputs/InputFilter'
import InputFilterNumber from '../inputs/InputFilterNumber'
import SelectFilter from '../select/SelectFilter'

let style = 'bg-white shadow-xl w-430 pt-4 px-8 h-screen animate__animated animate__faster z-30 fixed'

function SideBar() {
  const { states: UiState, functions: UiFunc } = useContext(UiContext)
  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)

  const handleClick = () => {
    UiFunc.setToggleSideBar()
  }

  const handleOrderAsc = (param) => {
    console.log(param)
  }

  const handleOrderDesc = (param) => {
    console.log(param)
  }

  return (
    <div
      className={UiState.toggleSideBar ? `${style} animate__slideInLeft` : `${style} animate__slideOutLeft`}>
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
        <InputFilterNumber type="text" label="ID (Solo numeros)" />
        <InputFilter type="text" label="Actividad" />
        <InputFilterNumber type="text" label="Prioridad RA (Solo numeros)" />

        <SelectFilter
          options={ActState.arrayUsersE}
          label="Encargado"
          orderPriority="orden_encargado"
          orderASC={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />
        <SelectFilter
          options={ActState.arrayPriority}
          label="Prioriad ToDo"
          orderPriority="orden_prioridad"
          orderASC={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />
        <SelectFilter
          options={ActState.arrayState}
          label="Estado"
          orderPriority="orden_estado"
          orderASC={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />
        <SelectFilter
          options={ActState.arrayProject}
          isController={true}
          label="Proyecto"
          orderPriority="orden_proyecto"
          orderASC={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />
        <SelectFilter
          iscontrollerBy={true}
          label="Sub proyecto"
          orderPriority="orden_sub_proyecto"
          orderASC={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />
        <SelectFilter
          options={ActState.arrayUsersS}
          label="Solicitante"
          orderPriority="orden_solicitante"
          orderASC={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />
      </div>

      <div className="flex justify-end mt-2">
        <ButtonText
          icon="fas fa-filter fa-sm"
          text="Limpiar"
          onclick={handleClick} />
        <ButtonText
          icon="fas fa-filter fa-sm"
          text="Filtrar"
          color="ml-2 bg-blue-500 hover:bg-blue-600 text-white transition duration-500"
          onclick={handleClick} />
      </div>
    </div>
  )
}

export default SideBar
