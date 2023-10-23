import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './Utils/store'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CallbackRoute } from './apis/CallBack';
import { Editor } from 'novel';
import SignIn from './Pages/Sing-In/SignIn';
import { OmniaWelcome } from './Pages/Omnia';
import { sd } from './Pages/defaultdata';
import { Omnia } from './Pages/Omnia copy';

//uncomment when you start application 
// const page = {
//   content : sd,
//   title : "Create New",
//   folder : "Folder Name"
// }

// localStorage.setItem('editor_page', JSON.stringify(page));



const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path : "/docs",
    element : <OmniaWelcome/>
  },
  {
    path : "/auth/callback",
    element : <CallbackRoute />

  },
  {
    path : "/docsnew",
    element : <Omnia />

  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>

      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
