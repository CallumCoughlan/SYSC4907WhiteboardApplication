import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );


const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

console.log('got here 3')

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);