import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// store 설정
const store = configureStore({ reducer: rootReducer });
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
