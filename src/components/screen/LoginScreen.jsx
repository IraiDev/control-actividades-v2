import React from 'react'
import { Login } from '@microsoft/mgt-react'
import logo25x25 from '../../assets/logo/logo25x25.png'

function LoginScreen() {
  return (
    <div className="bg-img-login">
      <div className="flex items-center h-screen">
        <div className="px-10 mx-auto bg-white rounded shadow-2xl w-96 py-7">
          <div className="flex justify-center">
            <img className="h-full pt-1 mr-2" src={logo25x25} alt="Zionit" />
            <h1 className="text-2xl">Zionit</h1>
          </div>
          <div className="text-lg text-center">
            <h1>Control de Actividades</h1>
            <br />
            <h5 className="text-sm">
              Inicia sesion con tu cuenta de microsoft
            </h5>
            <br />
            <button className="border border-blue-500">
              <Login />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
