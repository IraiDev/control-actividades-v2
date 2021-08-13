
import React from 'react'
// import ListNote from '../ui/list/ListNote';
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import Ptext from '../ui/text/Ptext';

function Card(props) {
  // const {
  //   actividad,
  //   encargado,
  //   estado,
  //   desc,
  //   id,
  //   solicitante,
  //   ticket,
  //   proyecto,
  //   subProyecto,
  //   pausa,
  //   prioridad,
  //   prioridadRA,
  //   user,
  // } = props;

  return (
    <div
      className={`rounded p-4 shadow-md text-sm font-normal ${"bg_color"} ${"act_pausa"} ${"colorTexto"}`}
    >
      <div className="flex items-center justify-between pb-2 text-base">
        <Ptext tag={"Actividad"} value={"actividad"} font={"font-bold"} />
        {"act_pausa_icon" ? (
          <div>
            <i className="fas fa-user-clock"></i>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={`grid grid-cols-12 mb-2 h-48 border-b ${"colorLinea"} pb-3 gap-2`}
      >
        <div className="col-span-3 md:col-span-2 lg:col-span-3 2xl:col-span-2">
          <Ptext
            tag={"Encar"}
            value={"encargado"}
            font={"font-bold"}
            isTippy={true}
            textTippy={"Encargado"}
          />
          <Ptext
            tag={"Proy"}
            value={"proyecto"}
            font={"font-bold"}
            isTippy={true}
            textTippy={"Proyecto"}
          />
          <Ptext
            tag={"Sub Proy"}
            value={"subProyecto"}
            isTippy={true}
            textTippy={"Sub Proyecto"}
          />
          <Ptext
            tag={"Soli"}
            value={"solicitante"}
            isTippy={true}
            textTippy={"Solicitante"}
          />
          <Ptext
            tag={"Est"}
            value={"newEstado"}
            isTippy={true}
            textTippy={"Estado"}
          />
          <Ptext tag={"Ticket"} value={"ticket"} />
          <Ptext tag={"ID"} value={"id"} />
        </div>
        <div className="col-span-4 2xl:col-span-5">
          <Ptext tag={"Descripcion"} />
          <div className="h-48 scroll-row">
            <p className="px-2 font-semibold leading-tight">{"desc"}</p>
          </div>
        </div>
        <div className="col-span-5">
          <Ptext tag={"Informes Diarios (notas)"} />
          <div id="scroll" className="scroll-row">
            <ul className="mt-1">
              {/* {arrNotes.map((obj) => {
                return (
                  <ListNote
                    key={obj.id}
                    colorFecha={colorFecha}
                    descripcion={obj.desc}
                    fecha={obj.fecha_crea}
                    user={obj.user_crea}
                  />
                )
              }).reverse()} */}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <Ptext tag={"Prioridad"} value={"act_prioridad"} font={"font-bold"} prioridad={"prioridadRA"} />
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
