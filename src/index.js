import React from 'react';
import ReactDOM from 'react-dom';
import { Providers, LocalizationHelper } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';
import App from './App';
import './index.css';
import './style.css'
import 'tippy.js/dist/tippy.css'

Providers.globalProvider = new Msal2Provider({
  clientId: 'b71117b7-2266-427c-b1c8-9e7f367cacc3',
  scopes: [
    "user.read",
    "openid",
    "profile",
    "people.read",
    "user.readbasic.all",
    "Tasks.Read",
    "Group.Read.All",
    "Group.ReadWrite.All",
    "Tasks.ReadWrite",
    "Presence.Read.All",
  ],
});

LocalizationHelper.strings = {
  _components: {
    login: {
      signInLinkSubtitle: "Iniciar sesion",
      signOutLinkSubtitle: "Cerrar sesion",
    },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
