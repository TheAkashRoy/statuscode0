import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import {BrowserRouter} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Auth0Provider domain='https://dev-pk5umjrfp1l7coy6.us.auth0.com' clientId='A4xx6YX2veoE1cM4zvVIsCEeFNGV9ca4'
  authorizationParams={{
    redirect_uri: window.location.origin
  }}>
    <App />
    </Auth0Provider>
      </BrowserRouter>
);


