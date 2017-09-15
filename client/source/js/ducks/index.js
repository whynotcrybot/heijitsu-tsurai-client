import { combineReducers } from 'redux'
import blueprints from './blueprints.duck'
import tasks from './tasks.duck'

const rootReducer = combineReducers({
  blueprints,
  tasks
})

export default rootReducer
