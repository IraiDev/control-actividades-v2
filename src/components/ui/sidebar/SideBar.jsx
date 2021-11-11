import React, { useContext, useEffect, useState } from 'react'
import { UiContext } from '../../../context/UiContext'
import { ActivityContext } from '../../../context/ActivityContext'
import { useForm } from '../../../hooks/useForm'
import Button from '../buttons/Button'
import InputFilter from '../inputs/InputFilter'
import SelectFilter from '../select/SelectFilter'

let style = 'bg-white shadow-xl min-w-sd-br-mobile sm:min-w-sd-br pt-4 h-screen animate__animated animate__faster z-30 fixed'
const initialState = { inputId: '', inputAct: '', inputPriority: '' }

function SideBar() {
  const { states: UiState, functions: UiFunc } = useContext(UiContext)
  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)
  const [{ inputId, inputAct, inputPriority }, onChangeValues, reset] = useForm(initialState)
  const [isChecked, setIsChecked] = useState(false)
  const [active, setActive] = useState(null)

  const toggleSideBar = () => {
    UiFunc.setToggleSideBar()
  }

  const handleOrderAsc = (param) => {
    UiFunc.setIsLoading(true)
    setActive(param)
    let newValue = UiFunc.saveFilters('orden', param)
    ActFunc.getActivities(newValue)
  }

  const handleOrderDesc = (param) => {
    UiFunc.setIsLoading(true)
    setActive(param)
    let newValue = UiFunc.saveFilters('orden', param)
    ActFunc.getActivities(newValue)
  }

  const handleFilter = () => {
    UiFunc.setIsLoading(true)
    let inputValues = `id_actividad=${inputId}&titulo=${inputAct}&prioridad_ra=${inputPriority}&`
    let newValues = UiFunc.saveFiltersInputs('id_actividad', 'titulo', 'prioridad_ra', inputValues)
    ActFunc.getActivities(newValues)
  }

  const onChangeCheck = () => {
    UiFunc.setIsLoading(true)
    setIsChecked(!isChecked)

    if (!isChecked) {
      let hideCA = UiFunc.saveFilters('usuario_no_mostrar', 'usuario_no_mostrar=ca&')
      ActFunc.getActivities(hideCA)
    } else {
      let showCA = UiFunc.saveFilters('usuario_no_mostrar')
      ActFunc.getActivities(showCA)
    }
  }

  useEffect(() => {
    if (UiState.isResetFilters) {
      UiFunc.setIsLoading(true)
      setIsChecked(false)
      setActive(null)
      reset()
    }
  }, [UiState.isResetFilters])

  // useEffect(() => {
  //   if (UiState.activeOrder) {
  //     setActive(null)
  //     UiFunc.setActiveOrder(false)
  //   }
  // }, [UiState.activeOrder])

  return (
    <div
      className={`${style} ${UiState.toggleSideBar ? 'animate__slideInLeft' : 'animate__slideOutLeft'}`}>
      <div className="h-5/6 sm:h-auto overflow-custom pb-20 w-full px-6">
        <div className="flex justify-between mb-4">
          <h1 className="pt-2 mb-4 text-xl">Filtros:</h1>
          <Button
            className="h-8 w-8 text-gray-600 hover:text-blue-500 mt-1"
            type="icon"
            icon="fas fa-times fa-lg"
            onClick={toggleSideBar}
          />
        </div>
        <div className="mb-10">
          <InputFilter
            isNumber={true}
            type="text"
            name="inputId"
            value={inputId}
            onchange={onChangeValues}
            placeholder="ID"
            tippyText="ID Actividad"
            orderPriority="orden_id"
            orderAsc={handleOrderAsc}
            orderDesc={handleOrderDesc}
            active={active}
          />
          <InputFilter
            type="text"
            name="inputAct"
            value={inputAct}
            onchange={onChangeValues}
            placeholder="Actividad"
            tippyText="Nombre Actividad"
            orderPriority="orden_actividad"
            orderAsc={handleOrderAsc}
            orderDesc={handleOrderDesc}
            active={active}
          />
          <InputFilter
            isNumber={true}
            type="text"
            name="inputPriority"
            value={inputPriority}
            onchange={onChangeValues}
            placeholder="Prioridad RA"
            tippyText="Prioridad RA"
            orderPriority="orden_prioridad_ra"
            orderAsc={handleOrderAsc}
            orderDesc={handleOrderDesc}
            active={active}
          />

          <SelectFilter
            isMulti={true}
            options={ActState.arrayUsersE}
            label="Encargado"
            orderPriority="orden_encargado"
            orderAsc={handleOrderAsc}
            orderDesc={handleOrderDesc}
            active={active}
          />
          <SelectFilter
            options={ActState.arrayPriority}
            label="Prioriad ToDo"
            orderPriority="orden_prioridad"
            orderAsc={handleOrderAsc}
            orderDesc={handleOrderDesc}
            active={active}
          />
          <SelectFilter
            options={ActState.arrayState}
            label="Estado"
            orderPriority="orden_estado"
            orderAsc={handleOrderAsc}
            orderDesc={handleOrderDesc}
            active={active}
          />
          <SelectFilter
            isMulti={true}
            options={ActState.arrayProject}
            isController={true}
            label="Proyecto"
            orderPriority="orden_proyecto"
            orderAsc={handleOrderAsc}
            orderDesc={handleOrderDesc}
            active={active}
          />
          <SelectFilter
            isMulti={true}
            isControllerBy={true}
            label="Sub proyecto"
            orderPriority="orden_sub_proyecto"
            orderAsc={handleOrderAsc}
            orderDesc={handleOrderDesc}
            active={active}
          />
          <SelectFilter
            isMulti={true}
            options={ActState.arrayUsersS}
            label="Solicitante"
            orderPriority="orden_solicitante"
            orderAsc={handleOrderAsc}
            orderDesc={handleOrderDesc}
            active={active}
          />

          <div className="flex items-center px-2 mt-2">
            <label htmlFor="checkbox-11111">
              <input
                id="checkbox-11111"
                className="mr-2"
                type="checkbox"
                checked={isChecked}
                onChange={onChangeCheck}
              />
              ocultar a usuario: CA
            </label>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <Button
            className="bg-gray-100 hover:bg-gray-50 hover:text-blue-500 px-4 py-1 rounded-full"
            shadow
            type="iconText"
            icon="fas fa-filter fa-sm"
            name="Limpiar"
            onClick={() => { UiFunc.setResetFilters(true) }} />
          <Button
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full"
            shadow
            type="iconText"
            icon="fas fa-filter fa-sm"
            name="Filtrar"
            onClick={handleFilter} />
        </div>
      </div>
    </div>
  )
}

export default SideBar