import React from 'react'
import moment from "moment";

function ListNote({ desc, date, dateColor, user }) {

  let name = "NN"

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
    <li className="pb-3 leading-tight">
      <p className={`bg-gray-800 bg-opacity-25 px-2 rounded-full inline font-normal text-xs ${dateColor}`}>
        <label className="mr-2">{name}</label>({moment(date).format("DD-MM-yyyy, HH:mm")})
      </p>
      <p className="inline ml-1 font-semibold">: {desc}</p>
    </li>
  )
}

export default ListNote
