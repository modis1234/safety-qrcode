import { combineReducers } from "redux";
import bridges from "./bridges";
import tunnels from "./tunnels";
import login from "./login";

const rootReducer = combineReducers({ bridges, tunnels, login });

export default rootReducer;
