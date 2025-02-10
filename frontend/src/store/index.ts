import { combineReducers } from "redux";
import { todoReducer } from "./modules/todo";

const rootReducer = combineReducers({
  todo: todoReducer,
});

export default rootReducer;
