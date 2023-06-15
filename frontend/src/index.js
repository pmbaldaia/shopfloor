import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import store from "./store/index";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <DragDropContext>
        <App />
      </DragDropContext>
    </BrowserRouter>
  </Provider>
);
