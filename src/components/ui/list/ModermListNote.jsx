import React from 'react'
import moment from "moment";

let name = "NN"

function ModernListNote(props) {
  const {
    desc,
    date,
    dateColor,
    user
  } = props

  switch (user) {
    case "9.411.789-5":
      name = "FMRN"
      break;
    case "19.050.844-7":
      name = "IARR"
      break;
    case "18.804.066-7":
      name = "SACU"
      break;
    case "15.953.693-9":
      name = "RDCT"
      break;
    case "13.116.052-6":
      name = "CA"
      break;
    default: name = 'NN'
      break;
  }

  return (
    <li className="pb-2">
      <div className={dateColor}>
        <p className="inline font-semibold text-2xs">{name}</p>
        <p className="ml-2 inline text-opacity-20">({moment(date).format("DD-MM-yyyy, HH:mm")})</p>
      </div>
      <div className="ml-2">
        <p className="leading-tight text-justify">{desc}</p>
      </div>
    </li>
  )
}

export default ModernListNote