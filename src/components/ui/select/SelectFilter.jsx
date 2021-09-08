import React, { useContext, useEffect, useState } from 'react'
import Select from "react-select";
import { UiContext } from '../../../context/UiContext';
import { ActivityContext } from '../../../context/ActivityContext';
import ButtonOrderFilter from '../buttons/ButtonOrderFilter';

let flag = true, stop = 0
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
    active,
    isMulti = false,
    closeMenuOnSelect = true
  } = props

  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)
  const { functions: UiFunc, states: UiState } = useContext(UiContext)
  const [selectValue, setSelectValue] = useState(null)
  const [multiSelectValue, setMultiSelectValue] = useState(null)

  const onChangeSelect = (option) => {
    let filter = `${option.name}=${option.value}&`
    UiFunc.saveFilters(option.name, filter)
    iscontrollerBy ? UiFunc.setSubProject(option) : setSelectValue(option)
  }

  const onChangeMultiSelect = (option) => {
    console.log('multi select seleccion: ', option)
    setMultiSelectValue(option)
  }

  const onChangeSelectController = (option) => {
    let filter = `${option.name}=${option.value}&`
    setSelectValue(option)
    UiFunc.saveFiltersController('subProy', option.name, filter)
    UiFunc.setSubProject(null)
    newSubProjecArray = ActState.arraySubProject.filter(item => option.id === item.id)
    newSubProjecArray.unshift({
      label: 'Todas',
      value: '',
      name: 'subProy',
    })
    option.label === 'Todas' ? flag = true : flag = false
  }

  useEffect(() => {
    if (UiState.isResetFilters) {
      setSelectValue(null)
      setMultiSelectValue(null)
      UiFunc.setSubProject(null)
      UiFunc.setResetFilters(false)
      UiFunc.setFilters('')
      flag = true
      stop = stop + 1
      if (stop === 6) {
        ActFunc.getActivities('_')
        stop = 0
      }
    }
  }, [UiState.isResetFilters])

  return (
    <div className="flex items-center justify-between px-2">
      <div>
        <label className="text-xs">{label}:</label>
        <div>
          <Select
            isMulti={isMulti}
            placeholder={'Seleccione una opcion'}
            closeMenuOnSelect={closeMenuOnSelect}
            className={`mb-2 ${width}`}
            options={iscontrollerBy ? (flag ? ActState.arraySubProject : newSubProjecArray) : options}
            onChange={isMulti ? onChangeMultiSelect : isController ? onChangeSelectController : onChangeSelect}
            value={isMulti ? multiSelectValue : iscontrollerBy ? UiState.subProject : selectValue}
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
