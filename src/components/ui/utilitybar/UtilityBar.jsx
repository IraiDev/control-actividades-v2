import React, { useContext } from 'react'
import { UiContext } from '../../../context/UiContext';
import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem } from '@szhsin/react-menu';
import UserTimer from './UserTimer';
import ButtonUnText from '../buttons/ButtonUnText';
import ButtonText from '../buttons/ButtonText';
import Tippy from '@tippyjs/react';

function UtilityBar() {
  const { functions } = useContext(UiContext)

  const click = () => {
    console.log('click click!!')
  }

  const handleSideBar = () => {
    functions.setToggleSideBar()
  }

  return (
    <div
      className={`flex flex-col lg:flex-row bg-white shadow sticky top-14 z-20 pt-5 px-10`}>
      <div className="flex justify-between order-last w-full pb-5 lg:order-first">
        <div>
          <ButtonText icon="fas fa-filter fa-sm" text="Filtrar" onclick={handleSideBar} />
        </div>
        <div className="flex">
          <ButtonUnText
            icon="fas fa-user-clock"
            tippyText="Todas las actividades"
            isTippy={true}
            onclick={click} />

          <ButtonUnText
            icon="fas fa-sync-alt"
            tippyText="Actualizar vista Planner"
            isTippy={true}
            onclick={click} />

          <Menu
            direction="bottom"
            overflow="auto"
            position="anchor"
            menuButton={
              <Tippy
                offset={[0, 2]}
                delay={[200, 0]}
                placement={"bottom"}
                content={<span>Notificaciones</span>}
              >
                <MenuButton className="focus:outline-none active:outline-none">
                  <i className="p-2 text-gray-700 rounded-full hover:bg-gray-200 fas fa-bell"></i>
                </MenuButton>
              </Tippy>
            }
          >
            <MenuGroup takeOverflow>
              {/* {notificaciones.length > 0 ? (
                notificaciones.map((obj, index) => {
                  return (
                    <MenuItem key={index}>
                      <p className="pb-3 text-sm border-b">
                        <strong>{obj.user_crea_nota.abrev_user}</strong> ha
                        creado una nota en la Actividad ID:{" "}
                        <strong>{obj.id_det}</strong>
                      </p>
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem>
                  <p>no hay notificaciones</p>
                </MenuItem>
              )} */}
            </MenuGroup>
            <MenuDivider />
            <MenuItem>
              <p className="px-3 hover:text-red-500">Marcar como vistas</p>
            </MenuItem>
          </Menu>

          <ButtonUnText
            icon="fas fa-paint-brush"
            tippyText="Ajustes de usuario"
            isTippy={true}
            onclick={click} />
        </div>
      </div>
      <div className="flex items-center justify-around order-first pb-5 lg:order-last">
        <UserTimer />
        <UserTimer />
        <UserTimer />
        <UserTimer />
        <UserTimer />
        {/* {tiempos.length > 0
          ? tiempos.map((obj, index) => {
              return (
                <UserTimer
                  key={index}
                  user={obj.usuario}
                  time={obj.tiempo}
                  estado={obj.estado}
                />
              );
            })
          : ""} */}
      </div>
    </div>
  )
}

export default UtilityBar
