import React, { useContext, useEffect, useState } from 'react'
import Select from "react-select";
import { UiContext } from '../../../context/UiContext';
import { ActivityContext } from '../../../context/ActivityContext';
import ButtonOrderFilter from '../buttons/ButtonOrderFilter';

let flag = true
const initialState = {
  label: 'Seleccione una opcion',
  value: '',
  id: null,
  name: ''
}
let newSubProjecArray = []

function SelectFilter(props) {
  const {
    iscontrollerBy = false,
    isController = false,
    width = 'w-60',
    options,
    label,
    orderPriority,
    bgColor,
    orderAsc,
    orderDesc,
    active
  } = props

  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)
  const { functions: UiFunc, states: UiState } = useContext(UiContext)
  const [selectValue, setSelectValue] = useState(initialState)

  const onChangeSelect = (option) => {
    let filter = `${option.name}=${option.value}&`
    UiFunc.saveFilters(option.name, filter)
    iscontrollerBy ? UiFunc.setSubProject(option) : setSelectValue(option)
  }

  const onChangeSelectController = (option) => {
    let filter = `${option.name}=${option.value}&`
    setSelectValue(option)
    UiFunc.saveFiltersController('subProy', option.name, filter)
    UiFunc.setSubProject(initialState)
    newSubProjecArray = ActState.arraySubProject.filter(item => option.id === item.id)
    newSubProjecArray.unshift({
      label: 'Todas las opciones',
      value: '',
      name: 'subProy',
    })
    option.label === 'Todas las opciones' ? flag = true : flag = false
  }

  useEffect(() => {
    if (UiState.isResetFilters) {
      setSelectValue(initialState)
      UiFunc.setSubProject(initialState)
      UiFunc.setResetFilters(false)
      UiFunc.setFilters('')
      flag = true
      ActFunc.getActivities('_')
    }
  }, [UiState.isResetFilters])

  return (
    <div className="flex items-center justify-between px-2">
      <div>
        <label className="text-xs">{label}:</label>
        <div>
          <Select
            placeholder="Seleccione una"
            className={`mb-2 ${width}`}
            options={iscontrollerBy ? (flag ? ActState.arraySubProject : newSubProjecArray) : options}
            onChange={isController ? onChangeSelectController : onChangeSelect}
            value={iscontrollerBy ? UiState.subProject : selectValue}
          />
        </div>
      </div>
      <ButtonOrderFilter
        orderPriority={orderPriority}
        bgColor={bgColor}
        orderAsc={orderAsc}
        orderDesc={orderDesc}
        active={active}
      />
    </div>
  )
}

export default SelectFilter
