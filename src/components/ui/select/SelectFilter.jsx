import React, { useContext, useEffect, useState } from 'react'
import Select from "react-select";
import { UiContext } from '../../../context/UiContext';
import { ActivityContext } from '../../../context/ActivityContext';
import ButtonOrderFilter from '../buttons/ButtonOrderFilter';

let stop = 0, flag = false
let newSubProjectArray = []

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
  } = props

  const { states: ActState, functions: ActFunc } = useContext(ActivityContext)
  const { functions: UiFunc, states: UiState } = useContext(UiContext)
  const [selectValue, setSelectValue] = useState(null)
  const [multiSelectValue, setMultiSelectValue] = useState(null)

  const onChangeSelect = (option) => {
    let filter = `${option.name}=${option.value}&`
    UiFunc.saveFilters(option.name, filter)
    setSelectValue(option)
  }

  const onChangeMultiSelect = (option) => {
    let arrayFilters = []

    iscontrollerBy ? UiFunc.setSubProject(option) : setMultiSelectValue(option)

    if (option.length > 0) {

      option.forEach(item => {
        arrayFilters.push(item.value)
      })

      switch (option[0].name) {

        case 'encargado':
          UiFunc.setMultiEncargados(arrayFilters)
          break;

        case 'proyecto':
          UiFunc.setMultiProyectos(arrayFilters)
          break;

        case 'subProy':
          UiFunc.setMultiSubProyectos(arrayFilters)
          break;

        case 'solicitante':
          UiFunc.setMultiSolicitantes(arrayFilters)
          break;

        default:
          break;
      }
    }
    else {
      if (multiSelectValue !== null && multiSelectValue.length > 0) {
        switch (multiSelectValue[0].name) {

          case 'encargado':
            UiFunc.setMultiEncargados([])
            break;

          case 'proyecto':
            UiFunc.setMultiProyectos([])
            break;

          case 'solicitante':
            UiFunc.setMultiSolicitantes([])
            break;

          default:
            break;
        }
      }
      if (UiState.subProject !== null && UiState.subProject.length > 0) {
        UiFunc.setMultiSubProyectos([])
      }
    }
  }

  const onChangeSelectController = (option) => {

    let arrayFilters = []
    newSubProjectArray.length = 0
    UiFunc.setSubProject(null)
    setMultiSelectValue(option)

    flag = true

    if (option.length > 0) {

      option.forEach(item => {
        arrayFilters.push(item.value)
      })

      UiFunc.setMultiProyectos(arrayFilters)

      ActState.arraySubProject.forEach(item => {
        option.forEach(opt => {
          if (opt.id === item.id) {
            newSubProjectArray.push({
              label: item.label,
              value: item.value,
              name: item.name
            })
          }
        })
      })
    }
    else {
      UiFunc.setMultiProyectos([])
      ActState.arraySubProject.forEach(item => {
        newSubProjectArray.push({
          label: item.label,
          value: item.value,
          name: item.name
        })
      })
    }
  }

  useEffect(() => {

    if (UiState.isResetFilters) {

      setSelectValue(null)
      setMultiSelectValue(null)

      UiFunc.setSubProject(null)
      UiFunc.setFilters('')
      UiFunc.setMultiEncargados([])
      UiFunc.setMultiProyectos([])
      UiFunc.setMultiSubProyectos([])
      UiFunc.setMultiSolicitantes([])

      flag = false

      stop = stop + 1

      if (stop === 6) {
        ActFunc.getActivities('nada')
        stop = 0
      }
      UiFunc.setResetFilters(false)
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
            className={`mb-2 ${width}`}
            options={iscontrollerBy ? flag ? newSubProjectArray : ActState.arraySubProject : options}
            onChange={isMulti ? isController ? onChangeSelectController : onChangeMultiSelect : onChangeSelect}
            value={isMulti ? iscontrollerBy ? UiState.subProject : multiSelectValue : selectValue}
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
