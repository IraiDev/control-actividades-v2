
import React, { useContext } from 'react'
import { ActivityContext } from '../../context/ActivityContext';
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import ListNote from '../ui/list/ListNote';
import Ptext from '../ui/text/Ptext';

let dateColor, textColor, lineColor, bgColor, actPriority, actPlay, isActPlay
let ArrayNotes = []

function Card(props) {
  const {
    actividad,
    encargado,
    estado,
    desc,
    id,
    solicitante,
    ticket,
    proyecto,
    subProyecto,
    pausa,
    prioridad,
    prioridadRA,
    notas
  } = props;
  const { states: ActState } = useContext(ActivityContext)

  switch (prioridad) {
    case 600:
      bgColor = ActState.userData.usuario.color_prioridad_baja
      textColor = 'text-white'
      lineColor = 'border-white'
      dateColor = 'text-white'
      actPriority = 'Prioridad baja'
      break;
    case 400:
      bgColor = ActState.userData.usuario.color_prioridad_media
      textColor = 'text-white'
      lineColor = 'border-white'
      dateColor = 'text-white'
      actPriority = 'Prioridad media'
      break;
    case 100:
      bgColor = ActState.userData.usuario.color_prioridad_alta
      textColor = 'text-white'
      lineColor = 'border-white'
      dateColor = 'text-white'
      actPriority = 'Prioridad alta'
      break;
    default:
      bgColor = 'bg-white'
      textColor = 'text-gray-600'
      lineColor = 'border-black'
      dateColor = 'text-white'
      actPriority = 'Sin prioridad'
      break;
  }

  if (pausa.length > 0) {
    if (pausa[pausa.length - 1].boton === 2) {
      isActPlay = true
      actPlay = 'border-4 border-black border-opacity-25'
    } else {
      isActPlay = false
      actPlay = ''
    }
  }

  console.log(notas)

  return (
    <div className={`rounded p-4 shadow-md text-sm ${bgColor} ${textColor} ${actPlay}`}>
      <div className="flex items-center justify-between pb-2 text-base">
        <Ptext tag={"Actividad"} value={actividad} font="font-bold" />
        {isActPlay && (<i className="fas fa-user-clock"></i>)}
      </div>
      <div className={`grid grid-cols-12 mb-2 h-48 border-b pb-3 gap-2 ${lineColor}`}>
        <div className="col-span-3 md:col-span-2 lg:col-span-3 2xl:col-span-2">
          <Ptext
            tag="Encar"
            value={encargado}
            font="font-bold"
            isTippy={true}
            textTippy="Encargado"
          />
          <Ptext
            tag="Proy"
            value={proyecto}
            font="font-bold"
            isTippy={true}
            textTippy="Proyecto"
          />
          <Ptext
            tag="Sub Proy"
            value={subProyecto}
            isTippy={true}
            textTippy="Sub Proyecto"
          />
          <Ptext
            tag="Soli"
            value={solicitante}
            isTippy={true}
            textTippy="Solicitante"
          />
          <Ptext
            tag="Est"
            value={estado === 1 ? "Pendiente" : estado === 2 ? "En trabajo" : ""}
            isTippy={true}
            textTippy="Estado"
          />
          <Ptext tag="Ticket" value={ticket} />
          <Ptext tag="ID" value={id} />
        </div>
        <div className="col-span-4 2xl:col-span-5">
          <Ptext tag="Descripcion" />
          <div className="h-48 scroll-row">
            <p className="px-2 font-semibold leading-tight">{desc}</p>
          </div>
        </div>
        <div className="col-span-5">
          <Ptext tag="Informes Diarios (notas)" />
          <div className="scroll-row">
            <ul className="mt-1">
              {
                notas.map(obj => {
                  if (id === obj.id_det) {
                    return (
                      <ListNote
                        key={obj.id_nota}
                        desc={obj.desc_nota}
                        date={obj.fecha_hora_crea}
                        user={obj.user_crea}
                        dateColor={dateColor}
                      />
                    )
                  } else {
                    return ''
                  }
                }).reverse()
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <Ptext tag="Prioridad" value={actPriority} font="font-bold" prioridad={prioridadRA} />
        <div>
          <Menu
            direction="left"
            menuButton={
              <MenuButton className="focus:outline-none active:outline-none">
                <i className="mx-2 fas fa-ellipsis-v"></i>
              </MenuButton>
            }
          >
            <MenuItem
              className="font-medium text-left"
            // onClick={() => {
            //   handleOpenModalAdd();
            // }}
            >
              Agregar Nota
            </MenuItem>
            <MenuItem
              className="font-medium text-left"
            // onClick={() => {
            //   handleOpenModalEdit();
            // }}
            >
              Editar/Agregar Nota
            </MenuItem>
            <MenuItem
              className="flex justify-between"
            // onClick={() => {
            //   handleClick(id, 100);
            // }}
            >
              <p className="font-medium">Prioridad Alta</p>
              <p
                className={`p-2 ml-3 ${"user.color_prioridad_alta"} rounded-full focus:outline-none active:outline-none`}
              ></p>
            </MenuItem>
            <MenuItem
              className="flex justify-between"
            // onClick={() => {
            //   handleClick(id, 400);
            // }}
            >
              <p className="font-medium">Prioridad Media</p>
              <p
                className={`p-2 ml-3 ${"user.color_prioridad_media"} rounded-full focus:outline-none active:outline-none`}
              ></p>
            </MenuItem>
            <MenuItem
              className="flex justify-between"
            // onClick={() => {
            //   handleClick(id, 600);
            // }}
            >
              <p className="font-medium">Prioridad Baja</p>
              <p
                className={`p-2 ml-3 ${"user.color_prioridad_baja"} rounded-full focus:outline-none active:outline-none`}
              ></p>
            </MenuItem>
            <MenuItem
              className="flex justify-between"
            // onClick={() => {
            //   handleClick(id, 1000);
            // }}
            >
              <p className="font-medium">Sin Prioridad</p>
              <p
                className={`p-2 ml-3 bg-gray-200 rounded-full focus:outline-none active:outline-none`}
              ></p>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default Card
