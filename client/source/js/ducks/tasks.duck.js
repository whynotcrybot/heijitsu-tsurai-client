import { CALL_API } from 'redux-api-middleware'

const FETCH_BLUEPRINTS_SUCCESS = 'FETCH_BLUEPRINTS_SUCCESS'

const COMPLETE_TASK = 'COMPLETE_TASK'
const COMPLETE_TASK_SUCCESS = 'COMPLETE_TASK_SUCCESS'
const COMPLETE_TASK_FAILURE = 'COMPLETE_TASK_FAILURE'

export const completeTask = (id) => ({
  [CALL_API]: {
    types: [COMPLETE_TASK, COMPLETE_TASK_SUCCESS, COMPLETE_TASK_FAILURE],
    endpoint: 'http://localhost:8090/blueprints/' + id + '/complete',
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  }
})

const INITIAL_STATE = {
  tasks: [],
  error: null,
  loading: false
}

export default function tasksReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BLUEPRINTS_SUCCESS:
      return {
        ...state,
        tasks: action.payload.filter(bp => {
          if (bp.completed.length) {
            const lastCompletedTask = bp.completed[bp.completed.length - 1]
            const lastCompletedAt = new Date(lastCompletedTask.completedAt).toDateString()
            const currentDate = new Date().toDateString()

            return (lastCompletedAt !== currentDate)
          }
          else return true
        })
      }

    case ADD_TASK:
      return {
        ...state,
        blueprints: [
          ...state.blueprints,
          action.payload
        ],
        error: null,
        loading: false
      }

      case COMPLETE_TASK:
        return {
          ...state,
          blueprints: [],
          error: null,
          loading: true
        }
      case COMPLETE_TASK_SUCCESS:
        return {
          ...state,
          blueprints: action.payload,
          error: null,
          loading: false
        }
      case COMPLETE_TASK_FAILURE:
        return {
          ...state,
          blueprints: [],
          error: 'some error',
          loading: false
        }

    default:
      return state
  }
}
