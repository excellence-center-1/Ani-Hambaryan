//client/index.js
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import Store from "./store/store";

const store = new Store();

export const Context = createContext({
    store: store
});

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
    <Context.Provider value={{ store }}>
        <App />
    </Context.Provider>
);
