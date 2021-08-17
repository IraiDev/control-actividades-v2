import React from 'react'
import Select from "react-select";
import ButtonOrderFilter from '../buttons/ButtonOrderFilter';

function SelectFilter({ width = 'w-60', option, label, value, onchange, orderPrioridad, bgColor, onclick }) {
  // const handleGetId = () => {
  //   getId(id);
  // };
  return (
    <div className="flex items-center justify-between px-2">
      <div>
        <label className="text-xs">{label}:</label>
        <div>
          <Select
            placeholder="Seleccione una opcion"
            className={`mb-2 ${width}`}
            options={option}
            onChange={onchange}
            value={value}
          />
        </div>
      </div>
      <ButtonOrderFilter orderPrioridad={orderPrioridad} bgColor={bgColor} onclick={onclick} />
    </div>
  )
}

export default SelectFilter
