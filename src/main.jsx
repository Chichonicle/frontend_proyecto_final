import React from 'react'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import store from "./app/store.js";

//REDUX PERSISTENCE

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </PersistGate>
    </Provider>
  </React.StrictMode>,
)
