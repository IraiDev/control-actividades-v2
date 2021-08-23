import React, { useContext, useEffect, useState } from 'react'
import { UiContext } from '../../../context/UiContext'
import { ActivityContext } from '../../../context/ActivityContext'
import { useForm } from '../../../hooks/useForm'
import ButtonText from '../buttons/ButtonText'
import InputFilter from '../inputs/InputFilter'
import SelectFilter from '../select/SelectFilter'
import ButtonUnText from '../buttons/ButtonUnText'

let style = 'bg-white shadow-xl w-430 pt-4 px-8 h-screen animate__animated animate__faster z-30 fixed'
const initialState = { inputId: '', inputAct: '', inputPriority: '' }

function SideBar() {
  const { states: UiState, functions: UiFunc } = useContext(UiContext)
  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)
  const [{ inputId, inputAct, inputPriority }, onChangeValues, reset] = useForm(initialState)
  const [isChecked, setIsChecked] = useState(false)

  const handleClick = () => {
    UiFunc.setToggleSideBar()
  }

  const handleOrderAsc = (param) => {
    ActFunc.getActivities(`${UiState.filters}${param}`)
  }

  const handleOrderDesc = (param) => {
    ActFunc.getActivities(`${UiState.filters}${param}`)
  }

  const handleFilter = () => {
    let inputValues = `id_actividad=${inputId}&titulo=${inputAct}&prioridad_ra=${inputPriority}&`
    let newValues = UiFunc.saveFiltersInputs('id_actividad', 'titulo', 'prioridad_ra', inputValues)
    ActFunc.getActivities(newValues)
  }

  const onsChangeCheck = () => {
    setIsChecked(!isChecked)
    if (isChecked) {
      let hideCA = UiFunc.saveFilters('usuario_no_mostar', 'usuario_no_mostar=ca&')
      console.log('no mostrar a CA', hideCA)
      ActFunc.getActivities(hideCA)
    } else {
      let showCA = UiFunc.saveFilters('usuario_no_mostar')
      console.log('mostrar a CA', showCA)
      ActFunc.getActivities(showCA)
    }
  }

  useEffect(() => {
    if (UiState.isResetFilters) {
      setIsChecked(false)
      reset()
    }
  }, [UiState.isResetFilters])

  return (
    <div
      className={UiState.toggleSideBar ? `${style} animate__slideInLeft` : `${style} animate__slideOutLeft`}>
      <div className="flex justify-between mb-6">
        <h1 className="pt-2 mb-4 text-xl">Filtros:</h1>
        <ButtonUnText
          icon="p-2 text-gray-600 fas fa-times fa-lg"
          onclick={handleClick}
        />
      </div>
      <div className="mb-10 h-700 scroll-row-side-bar">
        <InputFilter
          isNumber={true}
          type="text"
          name="inputId"
          value={inputId}
          onchange={onChangeValues}
          label="ID (Solo numeros)"
          orderPriority="orden_id"
          orderAsc={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />
        <InputFilter
          type="text"
          name="inputAct"
          value={inputAct}
          onchange={onChangeValues}
          label="Actividad"
          orderPriority="orden_actividad"
          orderAsc={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />
        <InputFilter
          isNumber={true}
          type="text"
          name="inputPriority"
          value={inputPriority}
          onchange={onChangeValues}
          label="Prioridad RA (Solo numeros)"
          orderPriority="orden_prioridad_ra"
          orderAsc={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />

        <SelectFilter
          options={ActState.arrayUsersE}
          label="Encargado"
          orderPriority="orden_encargado"
          orderAsc={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />
        <SelectFilter
          options={ActState.arrayPriority}
          label="Prioriad ToDo"
          orderPriority="orden_prioridad"
          orderAsc={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />
        <SelectFilter
          options={ActState.arrayState}
          label="Estado"
          orderPriority="orden_estado"
          orderAsc={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />
        <SelectFilter
          options={ActState.arrayProject}
          isController={true}
          label="Proyecto"
          orderPriority="orden_proyecto"
          orderAsc={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />
        <SelectFilter
          iscontrollerBy={true}
          label="Sub proyecto"
          orderPriority="orden_sub_proyecto"
          orderAsc={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />
        <SelectFilter
          options={ActState.arrayUsersS}
          label="Solicitante"
          orderPriority="orden_solicitante"
          orderAsc={handleOrderAsc}
          orderDesc={handleOrderDesc}
        />

        <div className="flex items-center px-2 mt-2">
          <label htmlFor="checkbox-1">
            <input
              id="checkbox-1"
              className="mr-2"
              type="checkbox"
              checked={isChecked}
              onChange={onsChangeCheck}
            />
            ocultar a usuario: CA
          </label>
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <ButtonText
          icon="fas fa-filter fa-sm"
          text="Limpiar"
          onclick={() => { UiFunc.setResetFilters(true) }} />
        <ButtonText
          icon="fas fa-filter fa-sm"
          text="Filtrar"
          color="ml-2 bg-blue-500 hover:bg-blue-600 text-white transition duration-500"
          onclick={handleFilter} />
      </div>
    </div>
  )
}

export default SideBar