import { combineReducers } from 'redux';
import bridges from './bridges'
import tunnels from './tunnels'

const rootReducer = combineReducers({ bridges, tunnels })

export default rootReducer;