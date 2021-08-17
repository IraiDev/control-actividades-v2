import React, { useContext, useState } from 'react'
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
  const [subProjectArray, setSubProjectArray] = useState(ActState.arraySubProject)

  const handleClick = () => {
    UiFunc.setToggleSideBar()
  }

  const onChangeSelect = (option) => {
    let filter = option.name + '=' + option.value + '&'
    UiFunc.saveFilters(option.name, filter)
    // console.log(option)
  }

  const onChangeSelectPoject = (option) => {
    UiFunc.saveFilters('sub_proyecto', '')
    let newSubProjecArray = ActState.arraySubProject.filter(item => option.id === item.id)
    setSubProjectArray(newSubProjecArray)
    let filter = option.name + '=' + option.value + '&'
    UiFunc.saveFilters(option.name, filter)
  }

  // console.log(ActState.arraySubProject)

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
        {/* <InputFilter type="text" label="Descripcion" placeholder="Filtrar por actividad..." /> */}
        <InputFilterNumber type="text" label="Prioridad RA (Solo numeros)" />

        <SelectFilter
          option={ActState.arrayUsersE}
          onchange={onChangeSelect}
          label="Encargado"
        />
        <SelectFilter
          option={ActState.arrayPriority}
          onchange={onChangeSelect}
          label="Prioriad ToDo"
        />
        <SelectFilter
          option={ActState.arrayState}
          onchange={onChangeSelect}
          label="Estado"
        />
        <SelectFilter
          option={ActState.arrayProject}
          onchange={onChangeSelectPoject}
          label="Proyecto"
        />
        <SelectFilter
          option={subProjectArray}
          onchange={onChangeSelect}
          label="Sub proyecto"
        />
        <SelectFilter
          option={ActState.arrayUsersS}
          onchange={onChangeSelect}
          label="Solicitante"
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
          color="ml-2 bg-blue-500 hover:bg-blue-600 text-white"
          onclick={handleClick} />
      </div>
    </div>
  )
}

export default SideBar
